import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const isCustomAuth = token.length > 50;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData?.id || decodedData?.userInfo?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub || decodedData?.userInfo?._json?.sub;
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
