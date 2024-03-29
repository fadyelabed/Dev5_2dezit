import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';
import { expressCspHeader, SELF, EVAL } from 'express-csp-header';

import * as coreRoutes from './routes/core-route';

import { setup } from './models';

express['application']['version'] = express.Router['group'] = function (arg1, arg2) {
	let fn, path;
	const router = express.Router(),
		self = this;
	if (typeof arg2 === 'undefined') {
		path = '/';
		fn = arg1;
	} else {
		path = '/' + arg1;
		fn = arg2;
	}
	fn(router);
	self.use(path, router);
	return router;
};

// process.env.TZ = 'Asia/Manila';

const database = setup();

class App {
	public express;
	public env = process.env.NODE_ENV || 'local';

	constructor() {
		this.express = express();
		this.express.disable('x-powered-by');

		this.addConfig();
		this.implementDocumentation();
		this.setRoute();
		this.setNotFound();
	}

	private addConfig(): void {
		this.express.use(helmet());
		this.express.use(compression());
		this.express.use(cors());
		this.express.use(express.json());
		this.express.use(express.urlencoded({ extended: true }));
	}

	private implementDocumentation(): void {
		if (this.env !== 'production') {
			this.express.use(
				'/documentation',
				expressCspHeader({
					directives: {
						'script-src': [SELF, EVAL],
					},
				}),
				express.static(__dirname + '/doc')
			);
		}
	}

	private setRoute(): void {
		this.express = coreRoutes.setup(this.express, database);
	}

	private setNotFound(): void {
		this.express.use((req, res) => {
			return res.status(404).json({
				status: 'failed',
				message: 'Page Not Found',
				executionTime: 0,
				data: '',
			});
		});
	}
}

export default new App().express;
