const resolvers = {
  Query: {
    CanvasCourses: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.CanvasData.getCourseData();
    },
  },
};

export default resolvers;
