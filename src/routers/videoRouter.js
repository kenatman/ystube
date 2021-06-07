import express from "express";
import {
  getEdit,
  getUpload,
  postEdit,
  postUpload,
  see,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-z]{24})", see);
videoRouter.route("/:id([0-9a-z]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
