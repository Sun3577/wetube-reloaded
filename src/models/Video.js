import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 10 },
  videoUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  createdAt: { type: Date, requried: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, requried: true },
    rating: { type: Number, default: 0, requried: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.pre("save", async function () {
  this.hashtags = this.hashtags
    .toString()
    .split(",")
    .map((word) => word.toUpperCase())
    .map((word) => word.trim())
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

videoSchema.static("formatHashtags", function (hashtags) {
  console.log(hashtags.split(","));
  return hashtags
    .split(",")
    .map((word) => word.toUpperCase())
    .map((word) => word.trim())
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
