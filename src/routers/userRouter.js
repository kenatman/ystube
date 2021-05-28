import express from "express";
import { deleteUser, edit, logout, see } from "../controllers/usercontroller";

const userRouter = express.Router();

userRouter.get("/:id", see);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);

export default userRouter;
