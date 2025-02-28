import mongoose, { Schema, Document } from "mongoose";

interface Session {
  joinedAt: Date;
  leftAt?: Date;
  duration?: number;
}

export interface IMeeting extends Document {
  meetingId: string;
  userId: string;
  sessions: Session[];
}

const MeetingSchema = new Schema<IMeeting>({
  meetingId: { type: String, required: true },
  userId: { type: String, required: true },
  sessions: [
    {
      joinedAt: { type: Date, required: true },
      leftAt: { type: Date },
      duration: { type: Number, default: 0 },
    },
  ],
});

export default mongoose.model<IMeeting>("Meeting", MeetingSchema);
