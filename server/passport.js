import passport from "passport";
import Google from "passport-google-oauth20";
const GoogleStrategy = Google.Strategy;
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { User } from "./models/User.js";

dotenv.config();

export default passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/memories",
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, cb) {
      // cb(null, profile)
      await User.findOrCreate(
        {
          googleId: profile.id,
          email: profile.emails[0].value,
        },

        function (err, user) {
          return cb(err, profile);
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
