import express from "express";
import {
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
} from "../controllers/usercontroller";
import { privateOnly, publicOnly } from "../localMiddleware";

const userRouter = express.Router();

userRouter.get("/logout", privateOnly, logout);

userRouter.route("/edit").all(privateOnly).get(getEdit).post(postEdit);

userRouter.get("/:id", see);

userRouter.get("/github/start", publicOnly, startGithubLogin);
userRouter.get("/github/finish", publicOnly, finishGithubLogin);

export default userRouter;
