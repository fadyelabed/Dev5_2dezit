import * as supertest from 'supertest';
import { expect } from 'chai';

import app from '../../../../app';

let testName: string = '';

describe('categories component', () => {
	it('should get all category', (done) => {
		supertest(app)
			.get('/v1/core/categories?test=true')
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

	it('should create category', (done) => {
		supertest(app)
			.post('/v1/core/category?test=true')
			.send({
				name: 'category-test',
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

	it('should get category', (done) => {
		supertest(app)
			.get(`/v1/core/category/${testName}?test=true`)
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

	it('should update category', (done) => {
		supertest(app)
			.put(`/v1/core/category/${testName}?test=true`)
			.send({
				name: 'category-test-update',
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

	it('should delete category', (done) => {
		supertest(app)
			.delete(`/v1/core/category/${testName}?test=true`)
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
