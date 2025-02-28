import mongoose from "mongoose";
import dotenv from "dotenv";
import Meeting from "./models/Meeting";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Dummy data
    const dummyData = [
      {
        meetingId: "12345",
        userId: "user1",
        sessions: [
          { joinedAt: new Date("2025-02-28T10:00:00Z"), leftAt: new Date("2025-02-28T10:30:00Z"), duration: 30 },
          { joinedAt: new Date("2025-02-28T11:00:00Z"), leftAt: new Date("2025-02-28T11:20:00Z"), duration: 20 },
        ],
        loginCount: 2,
      },
      {
        meetingId: "12345",
        userId: "user2",
        sessions: [
          { joinedAt: new Date("2025-02-28T10:15:00Z"), leftAt: new Date("2025-02-28T10:45:00Z"), duration: 30 },
        ],
        loginCount: 1,
      },
      {
        meetingId: "67890",
        userId: "user3",
        sessions: [
          { joinedAt: new Date("2025-02-28T09:00:00Z"), leftAt: new Date("2025-02-28T09:45:00Z"), duration: 45 },
        ],
        loginCount: 1,
      },
    ];

    // Insert data
    await Meeting.insertMany(dummyData);
    console.log("Dummy data inserted successfully!");

    // Close connection
    mongoose.connection.close();
  })
  .catch((err) => console.error("MongoDB connection error:", err));
