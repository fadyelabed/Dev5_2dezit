import { Helper } from '../app/services/helper/helper.service';
import { ApiResponse } from '../app/services/api-response/api-response.service';
import { Mongo } from '../app/services/mongo/mongo.service';

import { Categories } from '../app/v1/core/categories/categories.component';
import { Logs } from '../app/v1/core/logs/logs.component';

export function setup(app, models) {
	const response = new ApiResponse(),
		helper = new Helper();
	const mongo = new Mongo();

	app.version('v1/core', (appCore) => {
		appCore.use((req, res, next) => {
			res.startTime = new Date().getTime();

			req.models = models;

			if (!req.models) {
				return response.failed(res, 'model', '', 500);
			}

			next();
		});

		new Categories(appCore, response, helper, mongo);
		new Logs(appCore, response, helper, mongo);
	});

	return app;
}
