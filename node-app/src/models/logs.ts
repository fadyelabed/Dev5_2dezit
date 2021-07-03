export interface LogsAttributes {
	_id?: object | string;

	name?: string;
	description?: string;
	category?: {
		id?: string;
		name?: string;
	};

	updatedAt?: Date;
	createdAt?: Date;
}

export default function logModel(mongoose) {
	const logSchema = mongoose.Schema(
		{
			name: {
				type: String,
				required: true,
			},
			description: {
				type: String,
			},
			category: {
				id: {
					type: String,
				},
				name: {
					type: String,
				},
			},

			updatedAt: {
				type: Date,
				default: new Date(),
			},
			createdAt: {
				type: Date,
				default: new Date(),
			},
		},
		{ collation: { locale: 'en', strength: 2 } }
	);

	logSchema.index({ name: 1, 'category.id': 1, createdAt: -1 });

	return {
		name: 'logs',
		model: mongoose.model('logs', logSchema),
	};
}
