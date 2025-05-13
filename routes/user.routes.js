import express from "express";
import { createUser } from "../controllers/user.controllers.js";

const router = express.Router();
router.put("/login", createUser);

export default router;
