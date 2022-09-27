import Resolver from "../datatypes/resolver";

const resolvers: Resolver = {
  Query: {
    WatchData: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.watchData.getWatchData();
    },
  },
};

export default resolvers;
