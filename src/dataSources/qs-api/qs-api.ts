import { RESTDataSource } from "apollo-datasource-rest";
import { convertMsToHM } from "./helpers";
import { AttendanceData, RawAttendanceData } from "./types";

class QsApi extends RESTDataSource {
  willSendRequest(request: any) {
    request.headers.set("Authorization", this.context.Authorization);
  }

  constructor() {
    super();
    this.baseURL = "https://qsapi.azurewebsites.net/";
  }

  public transformAttendanceData(
    rawData: Array<RawAttendanceData>
  ): Array<AttendanceData> {
    const attendanceData: Array<AttendanceData> = new Array<AttendanceData>();
    let totalAttendanceTimeMs: number = 0;

    for (let i = 0; i < rawData.length; i += 2) {
      const firstDate = new Date(rawData[i].DateTime);
      const secondDate = new Date(rawData[i + 1].DateTime);

      if (secondDate.getDate() != firstDate.getDate())
        throw new Error("dates do not match");

      const firstTimeStamp = firstDate.getTime();
      const secondTimeStamp = secondDate.getTime();

      if (secondTimeStamp < firstTimeStamp)
        throw new Error("second time is before first!");

      totalAttendanceTimeMs += secondTimeStamp - firstTimeStamp;

      if (i + 3 >= rawData.length) {
        attendanceData.push({
          attendanceHours: convertMsToHM(totalAttendanceTimeMs),
          date: firstDate.toLocaleDateString(),
        });

        break;
      }

      const thirdDate = new Date(rawData[i + 2].DateTime).getDate();

      if (thirdDate != secondDate.getDate()) {
        attendanceData.push({
          attendanceHours: convertMsToHM(totalAttendanceTimeMs),
          date: firstDate.toLocaleDateString(),
        });

        totalAttendanceTimeMs = 0;
      }
    }

    return attendanceData;
  }

  async getAttendanceData() {
    const rawData = await this.get<Array<RawAttendanceData>>("attendance");

    return this.transformAttendanceData(rawData);
  }

  public async getUserFromDatabase(canvasId: number) {
    return this.get(`users/${canvasId}`);
  }

  public async createNewUser(canvasId: number, canvasAccessToken: string)
  {

  }
}

export default QsApi;
