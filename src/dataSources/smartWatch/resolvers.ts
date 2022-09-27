const resolvers = {
  Query: {
    WatchData: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.WatchData.getWatchData();
    },
  },
};

export default resolvers;
