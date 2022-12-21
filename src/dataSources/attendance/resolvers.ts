import Resolver from "../types/resolver";

const resolvers: Resolver = {
  Query: {
    attendanceData: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.attendanceData.getAttendanceData();
    },
  },
};

export default resolvers;
