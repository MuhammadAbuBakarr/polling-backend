import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    poll: { type: mongoose.Schema.Types.ObjectId, ref: "Poll" },
  },
  {
    timestamps: true,
  }
);
voteSchema.index({ user: 1, user: 1 }, { unique: true });
const Vote = mongoose.model("Vote", voteSchema);
export default Vote;
