import Resolver from "../types/resolver";

const resolvers: Resolver = {
  Query: {
    AttendanceData: async (_parent: never, _args: never, { dataSources }: any) => {
      return dataSources.attendanceData.getAttendanceData();
    },
  },
};

export default resolvers;
