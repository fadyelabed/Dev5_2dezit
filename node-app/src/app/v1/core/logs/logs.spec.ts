import * as supertest from 'supertest';
import { expect } from 'chai';

import app from '../../../../app';

let testName: string = '';

describe('logs component', () => {
	it('should get all log', (done) => {
		supertest(app)
			.get('/v1/core/logs?test=true')
			.expect('Content-Type', /json/)
			.expect(200, (err, res) => {
				if (err) {
					return done(err);
				}

				expect(res.body.status).to.equal('success');
				expect(res.body.data).to.be.a('Array');

				done();
			});
	});

	it('should create log', (done) => {
		supertest(app)
			.post('/v1/core/log?test=true')
			.send({
				name: 'log-test',
				category: {
					id: '60dc7cd230d2f8c458f4d871',
					name: 'walk',
				},
			})
			.expect('Content-Type', /json/)
			.expect(200, (err, res) => {
				if (err) {
					return done(err);
				}

				testName = res.body.data || 0;
				expect(res.body.status).to.equal('success');

				done();
			});
	});

	it('should get log', (done) => {
		supertest(app)
			.get(`/v1/core/log/${testName}?test=true`)
			.expect('Content-Type', /json/)
			.expect(200, (err, res) => {
				if (err) {
					return done(err);
				}

				expect(res.body.status).to.equal('success');
				expect(res.body.data).to.be.a('Object');

				done();
			});
	});

	it('should update log', (done) => {
		supertest(app)
			.put(`/v1/core/log/${testName}?test=true`)
			.send({
				name: 'log-test-update',
			})
			.expect('Content-Type', /json/)
			.expect(200, (err, res) => {
				if (err) {
					return done(err);
				}

				expect(res.body.status).to.equal('success');

				done();
			});
	});

	it('should delete log', (done) => {
		supertest(app)
			.delete(`/v1/core/log/${testName}?test=true`)
			.expect('Content-Type', /json/)
			.expect(200, (err, res) => {
				if (err) {
					return done(err);
				}

				expect(res.body.status).to.equal('success');

				done();
			});
	});
});
