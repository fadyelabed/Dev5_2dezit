import * as path from 'path';

import { Seeder } from 'mongo-seeding';

import { baseConfig } from './../config';

const env = process.env.NODE_ENV || 'local';

const config = baseConfig['database'][env] || {};

const mongoURL = `mongodb://${config['username']}:${config['password']}@${config['host']}:${config['port']}/${config['database']}`;

const seederConfig = {
	database: mongoURL,
	dropDatabase: true,
	dropCollections: true,
};

const seeder = new Seeder(seederConfig);
const collections = seeder.readCollectionsFromPath(path.resolve('./dist/seeders'), {
	extensions: ['ts'],
	transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
});

seeder
	.import(collections)
	.then(() => {
		console.log('Success');
	})
	.catch((err) => {
		console.log('Error', err);
	});
