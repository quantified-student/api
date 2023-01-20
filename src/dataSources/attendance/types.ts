type RawAttendanceData = {
  date?: string
  DateTime: string;
  AtLocation: number;
};

type AttendanceData = {
  date: string;
  attendanceHours: number;
};

export { RawAttendanceData, AttendanceData };
