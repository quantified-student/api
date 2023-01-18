import DataSource from '../types/datasource';
import QsApi from './qs-api';
import resolvers from './resolvers';
import typeDef from './typeDef';

export default new DataSource('attendanceData', QsApi, resolvers, typeDef);
