import QsApi from "../../../src/dataSources/attendance/qs-api";
import {
  RawAttendanceData,
} from "../../../src/dataSources/attendance/types";

const instance = new QsApi();

describe("qs-api", () => {
  it("should throw error when dates arent equal", () => {
    const data: Array<RawAttendanceData> = [
      { AtLocation: 0, DateTime: "2022-12-20 12:04:04" },
      { AtLocation: 1, DateTime: "2022-12-21 12:04:04" },
    ];

    const sut = instance.transformAttendanceData;

    expect(() => sut(data)).toThrowError("dates do not match");
  });

  it("should throw error when time is incorrect", () => {
    const data: Array<RawAttendanceData> = [
      { AtLocation: 0, DateTime: "2022-12-21 12:50:20" },
      { AtLocation: 1, DateTime: "2022-12-21 12:04:04" },
    ];

    const sut = instance.transformAttendanceData;

    expect(() => sut(data)).toThrow("second time is before first!");
  });

  const exptectedData = [
    {
      attendanceHours: 3,
      date: "12/21/2022",
    },
  ];
  const correctTestData = [
    [
      [
        { AtLocation: 1, DateTime: "2022-12-21 09:00:00" },
        { AtLocation: 0, DateTime: "2022-12-21 12:00:00" },
        { AtLocation: 1, DateTime: "2022-12-22 09:00:00" },
      ],
      exptectedData,
    ],
    [
      [
        { AtLocation: 1, DateTime: "2022-12-21 09:00:00" },
        { AtLocation: 0, DateTime: "2022-12-21 12:00:00" },
      ],
      exptectedData,
    ],
  ];

  test.each(correctTestData)("should pass", (input, expected) => {
    const sut = instance.transformAttendanceData;

    const result = sut(input as Array<RawAttendanceData>);

    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });
});
