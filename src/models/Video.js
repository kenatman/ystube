import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashTags: [{ type: String }],
  meta: { views: Number, ratings: Number },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
