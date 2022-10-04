const resolvers = {
  Query: {
    CanvasCourses: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.canvasData.getCourseData();
    },
  },
};

export default resolvers;
