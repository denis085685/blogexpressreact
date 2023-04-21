import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
    user:{
        type: String,
        required: true // 1:26:35
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", PostSchema);
