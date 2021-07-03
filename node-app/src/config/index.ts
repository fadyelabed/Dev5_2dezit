import * as dbConfig from './database-config.json';
import * as apiConfig from './api-config.json';

export const baseConfig = {
	name: 'node api',
	logo: 'https://via.placeholder.com/50',
	poweredBy: 'node',

	database: dbConfig,
	api: apiConfig,
};
