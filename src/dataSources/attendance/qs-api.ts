import { RESTDataSource } from "apollo-datasource-rest";
import { convertMsToHM } from "./helpers";
import { AttendanceData } from "./types";

class QsApi extends RESTDataSource {
  willSendRequest(request: any) {
    request.headers.set("Authorization", this.context.Authorization);
  }

  willSendResponse(response: any) {
    console.log(response);
  }

  constructor() {
    super();
    this.baseURL = "https://qsapi.azurewebsites.net/attendance";
  }

  async getAttendanceData() {
    const rawData = await this.get("");

    console.log(rawData);

    const attendanceData: Array<AttendanceData> = new Array<AttendanceData>();
    let timeVariableMs: number = 0;

    for (let i = 0; i < rawData.length; i += 2) {
      const firstDate = new Date(rawData[i].DateTime);
      const secondDate = new Date(rawData[i + 1].DateTime);

      if (secondDate.getDate() != firstDate.getDate())
        throw new Error("dates do not match");

      const firstTimeStamp = firstDate.getTime();
      const secondTimeStamp = secondDate.getTime();

      if (secondTimeStamp < firstTimeStamp)
        throw new Error("second time is before first!");

      timeVariableMs += secondTimeStamp - firstTimeStamp;

      if (i + 3 >= rawData.length) {
        attendanceData.push({
          attendanceHours: convertMsToHM(timeVariableMs),
          date: firstDate.toLocaleDateString(),
        });

        break;
      }

      const thirdDate = new Date(rawData[i + 2].DateTime).getDate();

      if (thirdDate != secondDate.getDate()) {
        attendanceData.push({
          attendanceHours: convertMsToHM(timeVariableMs),
          date: firstDate.toLocaleDateString(),
        });

        timeVariableMs = 0;
      }
    }

    return attendanceData;
  }
}

export default QsApi;
