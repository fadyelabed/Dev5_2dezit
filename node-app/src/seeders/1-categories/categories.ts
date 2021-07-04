import { Types } from 'mongoose';

import { CategoriesAttributes } from '../../models/categories';

const seedRoles: CategoriesAttributes[] = [
	{
		_id: Types.ObjectId('60dc7cd230d2f8c458f4d871'),
		name: 'walk',
		description: 'walking category',
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		_id: Types.ObjectId('60dc7da9e3cd362ef1ea0ddc'),
		name: 'run',
		description: 'running category',
		updatedAt: new Date(),
		createdAt: new Date(),
	},
	{
		_id: Types.ObjectId('60dc7db5749109dbef43c373'),
		name: 'eat',
		description: 'eating admin role',
		updatedAt: new Date(),
		createdAt: new Date(),
	},
];

export = seedRoles;
