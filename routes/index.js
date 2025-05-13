import express from "express";
import userRoutes from "./user.routes.js";
import voteRoutes from "./vote.routes.js";

const router = express.Router();

router.use(userRoutes);
router.use(voteRoutes);

export default router;
