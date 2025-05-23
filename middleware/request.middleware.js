import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const requestJWTvalidator = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  try {
    const decoded = jwt.verify(token, "super_strong_secret_key");
    if (!decoded) {
      throw new Error("Invalid User Token");
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: error?.message });
  }
};
