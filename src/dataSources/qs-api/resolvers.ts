import Resolver from "../types/resolver";

const resolvers: Resolver = {
  Query: {
    attendanceData: async (_: never, __: never, dataSources: any) => {
      return dataSources.AttendanceData.getAttendanceData();
    },
  },
};

export default resolvers;
