import User from "../model/User.js";
import Poll from "../model/Poll.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      throw new Error("Please Send All Data");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await User.findOne(
      {
        userName,
        password: hashedPassword,
      },
      {
        password: 0,
      }
    );
    if (userExists) {
      console.log(userExists);
      const token = jwt.sign(userExists, process.env.JWT_KEY);
      return res.status(200).json({ ...userExists?.toJSON(), token });
    }
    const user = await User.create({ userName, password: hashedPassword });
    const userObj = { ...user?.toJSON(), password: undefined };
    const token = jwt.sign(userObj, process.env.JWT_KEY);

    return res.status(200).json({
      ...userObj,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
export const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find({});
    return res.status(200).json(polls);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
