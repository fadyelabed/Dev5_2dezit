import { Helper } from './../helper/helper.service';

import { Types } from 'mongoose';

export class Mongo {
	helper: Helper;

	constructor() {
		this.helper = new Helper();
	}

	update(model, query: Object = {}, data: Object = {}) {
		try {
			data['updatedAt'] = new Date();

			if (!this.helper.isEmpty(query['_id'])) {
				query['_id'] = Types.ObjectId(query['_id']);
			}

			return model
				.findOneAndUpdate(query, { $set: data }, { new: true })
				.then((dataVal) => {
					return dataVal;
				})
				.catch((error) => error);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	delete(model, query: Object = {}) {
		try {
			if (!this.helper.isEmpty(query['_id'])) {
				query['_id'] = Types.ObjectId(query['_id']);
			}

			return model
				.findOneAndRemove(query)
				.then((dataVal) => {
					return dataVal;
				})
				.catch((error) => error);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	deleteAll(model, query: Object = {}) {
		try {
			if (!this.helper.isEmpty(query['_id'])) {
				query['_id'] = Types.ObjectId(query['_id']);
			}

			return model
				.deleteMany(query)
				.then((dataVal) => {
					return dataVal;
				})
				.catch((error) => error);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	post(model, data: Object = {}) {
		data['createdAt'] = new Date();
		data['updatedAt'] = new Date();

		return new model(data)
			.save()
			.then((dataVal) => {
				return dataVal || {};
			})
			.catch((error) => error);
	}

	getOne(model, query: Object = {}) {
		try {
			if (!this.helper.isEmpty(query['_id'])) {
				query['_id'] = Types.ObjectId(query['_id']);
			}

			return model
				.findOne(query)
				.then((dataVal) => {
					return dataVal ? dataVal.toObject() : {};
				})
				.catch((error) => error);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	getAll(model, data: Object = {}, reqQuery: Object = {}, fields = []): Promise<any> {
		const page: number = typeof reqQuery['page'] !== 'undefined' ? Number(reqQuery['page']) : 1;
		const limit: number = typeof reqQuery['limit'] !== 'undefined' ? Number(reqQuery['limit']) : 10;
		const offset: number = limit * (page - 1);

		const sortAt: string = typeof reqQuery['sortAt'] !== 'undefined' ? reqQuery['sortAt'] : 'DESC';
		const sortBy: string = typeof reqQuery['sortBy'] !== 'undefined' ? reqQuery['sortBy'] : 'createdAt';

		if (typeof reqQuery['query'] !== 'undefined') {
			data = this.appendRequestQuery(data, reqQuery['query']);
		}

		if (typeof reqQuery['queryArray'] !== 'undefined') {
			data = this.appendRequestQueryArray(data, reqQuery['queryArray']);
		}

		return model.countDocuments(data).then((count: number) => {
			return model
				.find(data, fields.length >= 1 ? fields : null)
				.sort({ [sortBy]: sortAt === 'DESC' ? -1 : 1 })
				.skip(offset)
				.limit(limit)
				.then((dataValue) => {
					const allPagination: Object = {};

					allPagination['totalData'] = count ? Number(count) : 0;
					allPagination['totalPage'] = Number(Math.ceil(allPagination['totalData'] / limit));
					allPagination['currentPage'] = Number(page);

					if (dataValue.length >= 1) {
						dataValue = dataValue.map((dData) => {
							return dData.toObject();
						});
					}

					return { data: dataValue || [], pagination: allPagination };
				});
		});
	}

	private appendRequestQuery(whereData: Object = {}, reqQuery: string = ''): Object {
		const reqQueryArray: Array<any> = reqQuery.split('|');
		const finalQuery: Object = {};

		reqQueryArray.forEach((val: any) => {
			const valArray: Array<any> = val.split(':');
			if (valArray[0] && valArray[1]) {
				let splitArray: Array<any> = valArray[1].toString().split(',');
				if (splitArray.length > 1) {
					splitArray = splitArray.map((splitval) => {
						return splitval === 'null' ? '' : new RegExp(splitval, 'i');
					});

					finalQuery[valArray[0]] = { $in: splitArray };
				} else {
					if (valArray[1] === 'null') {
						finalQuery[valArray[0]] = '';
					} else {
						// finalQuery[valArray[0]] = (this.helper.isInteger(valArray[1])) ? valArray[1] : new RegExp(valArray[1], 'i');
						finalQuery[valArray[0]] = new RegExp(valArray[1], 'i');
					}
				}
			}
		});

		return { ...whereData, ...finalQuery };
	}

	private appendRequestQueryArray(whereData: Object = {}, reqQuery: string = ''): Object {
		const reqQueryArray: Array<any> = reqQuery.split('|');
		const finalQuery: Object = {};

		reqQueryArray.forEach((val: any) => {
			const valKeyArray: Array<any> = val.split('.');

			if (valKeyArray[0] && valKeyArray[1]) {
				if (!finalQuery[valKeyArray[0]]) {
					finalQuery[valKeyArray[0]] = {};
					finalQuery[valKeyArray[0]]['$elemMatch'] = {};
				}

				const valArray: Array<any> = valKeyArray[1].split(':');
				if (valArray[0] && valArray[1]) {
					let splitArray: Array<any> = valArray[1].toString().split(',');
					if (splitArray.length > 1) {
						splitArray = splitArray.map((splitval) => {
							return splitval === 'null' ? '' : new RegExp(splitval, 'i');
						});
						finalQuery[valKeyArray[0]]['$elemMatch'][valArray[0]] = { $in: splitArray };
					} else {
						if (valArray[1] === 'null') {
							finalQuery[valKeyArray[0]]['$elemMatch'][valArray[0]] = '';
						} else {
							// finalQuery[valKeyArray[0]]['$elemMatch'][valArray[0]] = (this.helper.isInteger(valArray[1])) ? valArray[1] : new RegExp(valArray[1], 'i');
							finalQuery[valKeyArray[0]]['$elemMatch'][valArray[0]] = new RegExp(valArray[1], 'i');
						}
					}
				}
			}
		});

		return { ...whereData, ...finalQuery };
	}
}
