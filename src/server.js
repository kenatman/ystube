import express from "express";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import { localMiddleware } from "./localMiddleware";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

const app = express();

const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);

app.use(express.urlencoded({ extended: true })); // this middleware allows Express to understand data submitted from form as req.body
app.use(express.json()); // this middleware allows Express to convert string data coming from fetch to JSON and understand converted file.

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(flash());

app.use(localMiddleware);
app.use("/uploads", express.static("uploads"));
// when user gets to /upload, give contents inside of upload folder..
app.use("/static", express.static("assets"));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
