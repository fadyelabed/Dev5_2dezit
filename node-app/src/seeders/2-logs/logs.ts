import { Types } from 'mongoose';

import { LogsAttributes } from '../../models/logs';

const seedRoles: LogsAttributes[] = [
	{
		_id: Types.ObjectId('60dc7cd230d2f8c458f4d871'),
		name: 'test walk one',
		description: 'test walk one description',
		category: {
			id: '60dc7cd230d2f8c458f4d871',
			name: 'walk',
		},
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		_id: Types.ObjectId('60dc7da9e3cd362ef1ea0ddc'),
		name: 'test walk two',
		description: 'test walk two description',
		category: {
			id: '60dc7cd230d2f8c458f4d871',
			name: 'walk',
		},
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		_id: Types.ObjectId('60dc7db5749109dbef43c373'),
		name: 'test run one',
		description: 'test run one description',
		category: {
			id: '60dc7da9e3cd362ef1ea0ddc',
			name: 'run',
		},
		updatedAt: new Date(),
		createdAt: new Date(),
	},
];

export = seedRoles;
