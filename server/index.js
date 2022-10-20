import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportSetup from "./passport.js";
import authRoute from "./routes/auth.js";
import userRoutes from "./routes/user.js";

//middleware
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

app.use(
  session({
    secret: "memoriesss",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser("memoriesss"));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL)
  .then(console.log("connected to db"))
  .catch((err) => console.log(err));

app.use("/posts", postRoutes);
app.use("/auth", authRoute);
app.use("/users", userRoutes);

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Server running on port ${port}`);
});
