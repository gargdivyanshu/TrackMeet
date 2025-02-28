import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

interface Session {
    joinedAt: string;
    leftAt: string;
    duration: number;
  }  

interface Meeting {
    meetingId: string;
    userId: string;
    sessions: Session[];
  }

const MeetingReport = () => {
  const [meetingId, setMeetingId] = useState("");
  const [meetingData, setMeetingData] = useState<Session[]>([]);

  const fetchMeetingData = async () => {
    if (!meetingId) return;
  
    try {
      const response = await axios.get(`http://localhost:5000/api/meetings/${meetingId}`);
      if (response.data && response.data.length > 0) {
        // Flatten all sessions for all users into a single array
        const formattedData = response.data.flatMap((meeting: Meeting) => 
          meeting.sessions.map((session: Session) => ({
            meetingId: meeting.meetingId,
            userId: meeting.userId,
            joinedAt: session.joinedAt,
            leftAt: session.leftAt,
            duration: session.duration,
          }))
        );
  
        setMeetingData(formattedData);
      } else {
        setMeetingData([]); // Ensure state is cleared if no data is found
      }
    } catch (error) {
      console.error("Error fetching meeting data:", error);
      setMeetingData([]);
    }
  };
  

  const exportToExcel = () => {
    if (meetingData.length === 0) {
      alert("No data to export!");
      return;
    }
    
    const worksheet = XLSX.utils.json_to_sheet(meetingData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Meeting Data");
    XLSX.writeFile(workbook, `Meeting_${meetingId}_Report.xlsx`);
  };

  return (
    <div className="p-6">
      <input
        className="border p-2"
        type="text"
        placeholder="Meeting ID"
        onChange={(e) => setMeetingId(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 ml-2" onClick={fetchMeetingData}>
        Fetch
      </button>
      <button className="bg-green-500 text-white p-2 ml-2" onClick={exportToExcel}>
        Export
      </button>
    </div>
  );
};

export default MeetingReport;