import express from "express";
import { createVote, getPolls } from "../controllers/votes.controllers.js";
import { requestJWTvalidator } from "../middleware/request.middleware.js";

const router = express.Router();
router.get("/votes", requestJWTvalidator, getPolls);
router.post("/votes", requestJWTvalidator, createVote);

export default router;
