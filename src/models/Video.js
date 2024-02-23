import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, requried: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, requried: true },
    rating: { type: Number, default: 0, requried: true },
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
