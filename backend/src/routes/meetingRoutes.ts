import express from "express";
import { userJoin, userLeave, getMeetingData } from "../controllers/meetingController";

const router = express.Router();

router.post("/join", userJoin);
//router.post("/leave", userLeave);
router.get("/:meetingId", getMeetingData);

export default router;
