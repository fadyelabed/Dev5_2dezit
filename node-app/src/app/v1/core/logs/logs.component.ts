import { Request, Response } from 'express';
import { CoreMiddleware } from '../../../middlewares/core/core.middleware';

import { LogsAttributes } from '../../../../models/logs';

export class Logs extends CoreMiddleware {
	constructor(app, private response, private helper, private query) {
		super(app);
	}

	get services() {
		return {
			'GET /logs': 'all',
			'GET /log/:id': 'get',
			'POST /log': 'post',
			'PUT /log/:id': 'put',
			'DELETE /log/:id': 'delete',
		};
	}

	/**
	 * @api {get} /core/logs get all logs
	 * @apiVersion 1.0.0
	 * @apiName all
	 * @apiGroup LOGS
	 * @apiPermission all
	 *
	 * @apiDescription get all logs
	 *
	 * @apiParam (url parameter) {String} [query] filter query <br/>Ex. ?query=key:value
	 * @apiParam (url parameter) {Number} [limit=10] data limit <br/>Ex. ?limit=1
	 * @apiParam (url parameter) {Number} [page=1] page number <br/>Ex. ?page=1
	 */
	all(req: Request, res: Response): void {
		return this.query
			.getAll(req.models.logs, {}, req.query)
			.then((logs: any) => {
				const { data, pagination } = logs || { data: [], pagination: {} };
				return this.response.success(res, 'get', data || [], pagination);
			})
			.catch((error) => this.response.failed(res, 'get', error));
	}

	/**
	 * @api {get} /core/log/:id get logs
	 * @apiVersion 1.0.0
	 * @apiName get
	 * @apiGroup LOGS
	 * @apiPermission all
	 *
	 * @apiDescription get one logs
	 *
	 * @apiParam (url segment) {Number} id log id
	 * @apiParam (url parameter) {String} key key search <br/>Ex. ?key=name
	 */
	get(req: Request, res: Response): void {
		const id = req.params.id;

		const whereData = {
			[(req.query.key || '_id').toString()]: id,
		};

		return this.query
			.getOne(req.models.logs, whereData)
			.then((log: LogsAttributes) => this.response.success(res, 'get', log || {}))
			.catch((error) => this.response.failed(res, 'get', error));
	}

	/**
	 * @api {post} /core/log insert logs
	 * @apiVersion 1.0.0
	 * @apiName post
	 * @apiGroup LOGS
	 * @apiPermission all
	 *
	 * @apiDescription insert logs
	 *
	 * @apiParam (body) {String} name name
	 * @apiParam (body) {Object} category category <br/>Ex. `{id: '111', name: 'cat1'}`
	 * @apiParam (body) {String} [description] description
	 */
	post(req: Request, res: Response): void {
		const reqParameters = ['name', 'category'];
		if (!this.helper.validateData(req.body, reqParameters)) {
			return this.response.failed(res, 'data', reqParameters);
		}

		const data = req.body;

		return this.query
			.post(req.models.logs, data)
			.then((log: LogsAttributes) => this.response.success(res, 'post', log._id))
			.catch((error) => this.response.failed(res, 'post', error));
	}

	/**
	 * @api {put} /core/log/:id update logs
	 * @apiVersion 1.0.0
	 * @apiName put
	 * @apiGroup LOGS
	 * @apiPermission all
	 *
	 * @apiDescription update logs
	 *
	 * @apiParam (url segment) {Number} id log id
	 * @apiParam (body) {String} [name] name
	 * @apiParam (body) {Object} [category] category <br/>Ex. `{id: '111', name: 'cat1'}`
	 * @apiParam (body) {String} [description] description
	 */
	put(req: Request, res: Response): void {
		const id = req.params.id;

		const data = req.body;

		return this.query
			.update(req.models.logs, { _id: id }, data)
			.then((log: LogsAttributes) => this.response.success(res, 'post', id))
			.catch((error) => this.response.failed(res, 'put', error));
	}

	/**
	 * @api {delete} /core/log/:id delete logs
	 * @apiVersion 1.0.0
	 * @apiName delete
	 * @apiGroup LOGS
	 * @apiPermission all
	 *
	 * @apiDescription delete logs
	 *
	 * @apiParam (url segment) {Number} id log id
	 */
	delete(req: Request, res: Response): void {
		const id = req.params.id;

		return this.query
			.delete(req.models.logs, { _id: id })
			.then((log: LogsAttributes) => this.response.success(res, 'post', id))
			.catch((error) => this.response.failed(res, 'delete', error));
	}
}
