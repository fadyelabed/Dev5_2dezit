import { Request, Response } from 'express';
import { CoreMiddleware } from '../../../middlewares/core/core.middleware';

import { CategoriesAttributes } from '../../../../models/categories';
import { LogsAttributes } from '../../../../models/logs';

export class Categories extends CoreMiddleware {
	constructor(app, private response, private helper, private query) {
		super(app);
	}

	get services() {
		return {
			'GET /categories': 'all',
			'GET /category/:id': 'get',
			'POST /category': 'post',
			'PUT /category/:id': 'put',
			'DELETE /category/:id': 'delete',
		};
	}

	/**
	 * @api {get} /core/categories get all category
	 * @apiVersion 1.0.0
	 * @apiName all
	 * @apiGroup CATEGORIES
	 * @apiPermission all
	 *
	 * @apiDescription get all category
	 *
	 * @apiParam (url parameter) {String} [query] filter query <br/>Ex. ?query=key:value
	 * @apiParam (url parameter) {Number} [limit=10] data limit <br/>Ex. ?limit=1
	 * @apiParam (url parameter) {Number} [page=1] page number <br/>Ex. ?page=1
	 */
	all(req: Request, res: Response): void {
		return this.query
			.getAll(req.models.categories, {}, req.query)
			.then((categories: any) => {
				const { data, pagination } = categories || { data: [], pagination: {} };
				return this.response.success(res, 'get', data || [], pagination);
			})
			.catch((error) => this.response.failed(res, 'get', error));
	}

	/**
	 * @api {get} /core/category/:id get category
	 * @apiVersion 1.0.0
	 * @apiName get
	 * @apiGroup CATEGORIES
	 * @apiPermission all
	 *
	 * @apiDescription get one category
	 *
	 * @apiParam (url segment) {Number} id category id
	 * @apiParam (url parameter) {String} key key search <br/>Ex. ?key=name
	 */
	get(req: Request, res: Response): void {
		const id = req.params.id;

		const whereData = {
			[(req.query.key || '_id').toString()]: id,
		};

		return this.query
			.getOne(req.models.categories, whereData)
			.then((category: CategoriesAttributes) => this.response.success(res, 'get', category || {}))
			.catch((error) => this.response.failed(res, 'get', error));
	}

	/**
	 * @api {post} /core/category insert category
	 * @apiVersion 1.0.0
	 * @apiName post
	 * @apiGroup CATEGORIES
	 * @apiPermission all
	 *
	 * @apiDescription insert category
	 *
	 * @apiParam (body) {String} name name
	 * @apiParam (body) {String} [description] description
	 */
	post(req: Request, res: Response): void {
		const reqParameters = ['name'];
		if (!this.helper.validateData(req.body, reqParameters)) {
			return this.response.failed(res, 'data', reqParameters);
		}

		const data = req.body;

		return this.query
			.post(req.models.categories, data)
			.then((category: CategoriesAttributes) => this.response.success(res, 'post', category._id))
			.catch((error) => this.response.failed(res, 'post', error));
	}

	/**
	 * @api {put} /core/category/:id update category
	 * @apiVersion 1.0.0
	 * @apiName put
	 * @apiGroup CATEGORIES
	 * @apiPermission all
	 *
	 * @apiDescription update category
	 *
	 * @apiParam (url segment) {Number} id category id
	 * @apiParam (body) {String} [name] name
	 * @apiParam (body) {String} [description] description
	 */
	put(req: Request, res: Response): void {
		const id = req.params.id;

		const data = req.body;

		return this.query
			.update(req.models.categories, { _id: id }, data)
			.then((category: CategoriesAttributes) => this.response.success(res, 'post', id))
			.catch((error) => this.response.failed(res, 'put', error));
	}

	/**
	 * @api {delete} /core/category/:id delete category
	 * @apiVersion 1.0.0
	 * @apiName delete
	 * @apiGroup CATEGORIES
	 * @apiPermission all
	 *
	 * @apiDescription delete category
	 *
	 * @apiParam (url segment) {Number} id category id
	 */
	delete(req: Request, res: Response): void {
		const id = req.params.id;

		return this.query
			.delete(req.models.categories, { _id: id })
			.then((category: CategoriesAttributes) => {
				if (!category._id) {
					return Promise.reject({});
				}

				return this.query.deleteAll(req.models.logs, { 'category.id': id });
			})
			.then((category: LogsAttributes) => this.response.success(res, 'post', id))
			.catch((error) => this.response.failed(res, 'delete', error));
	}
}
