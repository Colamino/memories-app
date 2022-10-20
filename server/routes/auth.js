import express from "express";
const router = express.Router();
import passport from "passport";
import jwt from "jsonwebtoken";

const CLIENT_URL = "http://localhost:3000/";

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

//client side will come here and authenticate
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email", "openid"] })
);

//we set this route in passport.js, google will automatic redirect to here
router.get(
  "/google/memories",
  passport.authenticate("google", {
    //if success, will redirect to client side
    successRedirect: CLIENT_URL,
    //if failed will redirect to server failed page
    failureRedirect: "/login/failed",
  })
);

//req.user can get user data
router.get("/login/success", isLoggedIn, (req, res) => {
  const userInfo = req.user;
  if (userInfo) {
    const token = jwt.sign({ userInfo: userInfo }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "successfull",
      user: { userInfo: userInfo, token },
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect(CLIENT_URL);
});

export default router;
