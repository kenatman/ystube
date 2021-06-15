import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/usercontroller";
import { home, search } from "../controllers/videoController";
import { publicOnly } from "../localMiddleware";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").all(publicOnly).get(getJoin).post(postJoin);
globalRouter.route("/login").all(publicOnly).get(getLogin).post(postLogin);
globalRouter.get("/search", search);

export default globalRouter;
