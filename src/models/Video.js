import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 10 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },
  },
});

videoSchema.static(`formatHashtags`, function (hashtags) {
  return hashtags
    .split(`,`)
    .map((item) => (item.startsWith(`#`) ? item : `#${item}`));
});

const Video = mongoose.model(`Video`, videoSchema);
export default Video;
