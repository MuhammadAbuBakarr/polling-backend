import Poll from "../model/Poll.js";
import Vote from "../model/Vote.js";

export const getPolls = async (req, res) => {
  try {
    const polls = await Poll.aggregate([
      {
        $lookup: {
          from: "votes",
          localField: "_id",
          foreignField: "poll",
          as: "votes",
        },
      },
      {
        $addFields: {
          voteCount: { $size: "$votes" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          voteCount: 1,
        },
      },
      { $sort: { voteCount: -1 } },
    ]);

    return res.status(200).json(polls);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
export const createVote = async (req, res) => {
  try {
    const { poll } = req.body;
    if (!poll) {
      throw new Error("Please Send Poll Id");
    }
    const payload = {
      user: req.user._id,
      poll: req.body.poll,
    };
    const vote = await Vote.create(payload);
    return res.status(200).json(vote);
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      return res.status(500).json({ message: "Vote is Already Created!" });
    }
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};
