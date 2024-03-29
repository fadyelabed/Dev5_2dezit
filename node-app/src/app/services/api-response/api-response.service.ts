import { Response } from 'express';

export class ApiResponse {
	env: string = process.env.NODE_ENV || 'local';

	constructor() {}

	getMessage(method: string = ''): string {
		let message: string = '';

		switch (method) {
			case 'post-success':
				message = 'Insert Success';
				break;

			case 'put-success':
				message = 'Update Success';
				break;

			case 'delete-success':
				message = 'Delete Success';
				break;

			case 'post-failed':
				message = 'Insert Failed';
				break;

			case 'put-failed':
				message = 'Update Failed';
				break;

			case 'delete-failed':
				message = 'Delete Failed';
				break;

			case 'data-failed':
				message = 'Missing Parameters';
				break;

			case 'model-failed':
				message = 'Internal Server Error';
				break;

			default:
				message = method;
		}
		return message;
	}

	getError(method: string = ''): string {
		let message: string = '';

		switch (method) {
			case 'DatabaseError':
				message = 'Database Error';
				break;

			case 'NetworkingError':
				message = 'Network Error';
				break;

			default:
				message = method;
		}
		return message;
	}

	success(res: Response, param: string, data: any = '', pagination: Object = {}, status: number = 200): any {
		const resData = {
			status: 'success',
			message: this.getMessage(`${param}-success`),
			executionTime: res.startTime ? (new Date().getTime() - res.startTime) / 1000 : 0,
			data: data,
		};

		if (pagination && Object.keys(pagination).length !== 0 && pagination.constructor === Object) {
			resData['pagination'] = pagination || {};
		}

		return res.status ? res.status(status || 200).json(resData) : resData;
	}

	failed(res: Response, param: string, data: any = '', error: number = 400): any {
		const resData = {
			status: 'failed',
			message: this.getMessage(`${param}-failed`),
			executionTime: res.startTime ? (new Date().getTime() - res.startTime) / 1000 : 0,
			data: this.env === 'production' ? this.getError(data.name || data.code) : data,
		};
		return res.status ? res.status(error || 400).json(resData) : resData;
	}
}
