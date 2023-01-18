import Resolver from '../types/resolver';

const resolvers: Resolver = {
  Query: {
    WatchData: async (_: any, __: any, { dataSources }: any) => dataSources.watchData.getWatchData(),
  },
};

export default resolvers;
