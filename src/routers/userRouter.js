import express from "express";
import {
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/usercontroller";
import { privateOnly, publicOnly } from "../localMiddleware";

const userRouter = express.Router();

userRouter.get("/logout", privateOnly, logout);

userRouter.route("/edit").all(privateOnly).get(getEdit).post(postEdit);

userRouter.get("/github/start", publicOnly, startGithubLogin);
userRouter.get("/github/finish", publicOnly, finishGithubLogin);

userRouter
  .route("/change-password")
  .all(privateOnly)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter.get("/:id", see);

export default userRouter;
