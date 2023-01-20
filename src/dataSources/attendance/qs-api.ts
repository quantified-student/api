import { RESTDataSource } from "apollo-datasource-rest";
import { convertMsToHM, groupBy } from "./helpers";
import { AttendanceData, RawAttendanceData } from "./types";

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

  public transformAttendanceData(
    rawData: Array<RawAttendanceData>
  ): Array<AttendanceData> {
    const attendanceData: Array<AttendanceData> = new Array<AttendanceData>();
    rawData.map((point: RawAttendanceData) => {
      point.date = point.DateTime.split('T')[0];
    });

    let attendanceHolder: any = groupBy(rawData, 'date');
    Object.entries(attendanceHolder).forEach((date: any) => {
      let attendanceHours: number = 0;
      for (let i = 0; i < date[1].length; i++) {
        if (date[1][i].AtLocation == 0) {
          continue;
        } else if (date[1].length - 1 == i) {
          continue
        } else if (date[1][i + 1].AtLocation == 0) {
          let firstDate: Date = new Date(date[1][i].DateTime);
          let secondDate: Date = new Date(date[1][i+1].DateTime);
          let firstTime: number = firstDate.getTime();
          let secondTime: number = secondDate.getTime();
          attendanceHours += convertMsToHM(secondTime) - convertMsToHM(firstTime);
        }
      }
      let entry: AttendanceData = { date: date[0], attendanceHours: attendanceHours  };
      attendanceData.push(entry);
    })
    
    return attendanceData;
  }

  async getAttendanceData() {
    const rawData = await this.get<Array<RawAttendanceData>>("");

    return this.transformAttendanceData(rawData);
  }
}

export default QsApi;
