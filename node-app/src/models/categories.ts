export interface CategoriesAttributes {
	_id?: object | string;

	name?: string;
	description?: string;

	updatedAt?: Date;
	createdAt?: Date;
}

export default function categoryModel(mongoose) {
	const categorySchema = mongoose.Schema(
		{
			name: {
				type: String,
			},
			description: {
				type: String,
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

	categorySchema.index({ name: 1, createdAt: -1 });

	return {
		name: 'categories',
		model: mongoose.model('categories', categorySchema),
	};
}
