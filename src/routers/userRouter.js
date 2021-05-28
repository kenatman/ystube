import express from "express";
import { deleteUser, edit, logout, see } from "../controllers/usercontroller";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);
userRouter.get("/:id", see);

export default userRouter;
