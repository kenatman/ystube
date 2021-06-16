import express from "express";
import {
  deleteVideo,
  getEdit,
  getUpload,
  postEdit,
  postUpload,
  see,
} from "../controllers/videoController";
import { privateOnly, videoUpload } from "../localMiddleware";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-z]{24})", see);
videoRouter
  .route("/:id([0-9a-z]{24})/edit")
  .all(privateOnly)
  .get(getEdit)
  .post(postEdit);
videoRouter.all(privateOnly).get("/:id([0-9a-z]{24})/delete", deleteVideo);
videoRouter
  .route("/upload")
  .all(privateOnly)
  .get(getUpload)
  .post(videoUpload.single("video"), postUpload);

export default videoRouter;
