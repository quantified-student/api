import DataSource from '../types/datasource';
import typeDef from './typeDef';
import resolvers from './resolvers';
import WatchDataApi from './watch-api';

export default new DataSource('watchData', WatchDataApi, resolvers, typeDef);
