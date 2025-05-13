import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
