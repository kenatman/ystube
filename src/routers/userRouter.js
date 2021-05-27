import express from "express";
import { handleEdit, handleRemove } from "../controllers/usercontroller";

const userRouter = express.Router();

userRouter.get("/edit", handleEdit);
userRouter.get("/remove", handleRemove);

export default userRouter;
