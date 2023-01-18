import Resolver from '../types/resolver';

const resolvers: Resolver = {
  Query: {
    attendanceData: async (_: never, __: never, dataSources: any) => dataSources.AttendanceData.getAttendanceData(),
  },
};

export default resolvers;
