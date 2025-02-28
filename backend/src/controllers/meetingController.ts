import { Request, Response } from "express";
import Meeting from "../models/Meeting";
import moment from "moment";

export const userJoin = async (req: Request, res: Response) => {
  try {
    const { meetingId, userId } = req.body;

    let meeting = await Meeting.findOne({ meetingId, userId });

    if (!meeting) {
      meeting = new Meeting({ meetingId, userId, sessions: [] });
    }

    meeting.sessions.push({ joinedAt: new Date() });

    await meeting.save();
    res.status(200).json({ message: "User joined", meeting });
  } catch (error) {
    const err = error as Error; // Explicitly cast error to Error
    res.status(500).json({ error: err.message });
  }
};

export const userLeave = async (req: Request, res: Response) => {
  try {
    const { meetingId, userId } = req.body;
    const meeting = await Meeting.findOne({ meetingId, userId });

    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    const lastSession = meeting.sessions[meeting.sessions.length - 1];
    if (!lastSession.leftAt) {
      lastSession.leftAt = new Date();
      lastSession.duration = moment(lastSession.leftAt).diff(moment(lastSession.joinedAt), "minutes");
      await meeting.save();
    }

    res.status(200).json({ message: "User left", meeting });
  } catch (error) {
    const err = error as Error; // Explicitly cast error to Error
    res.status(500).json({ error: err.message });
  }
};

export const getMeetingData = async (req: Request, res: Response) => {
  try {
    const { meetingId } = req.params;
    const meetingData = await Meeting.find({ meetingId });

    res.status(200).json(meetingData);
  } catch (error) {
    const err = error as Error; // Explicitly cast error to Error
    res.status(500).json({ error: err.message });
  }
};
