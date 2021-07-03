import { expect } from 'chai';
import { Mongo } from './mongo.service';

import { setup } from './../../../models';

describe('mongo service', () => {
	let services;
	let models;

	const getfinalData = function (data) {
		data = typeof data.get !== 'undefined' ? data.get({ plain: true }) : data;

		const finalData: Object = { data: data.data || [], pagination: data.pagination || {} };

		return finalData['data'];
	};

	beforeEach((done) => {
		services = new Mongo();
		models = setup();

		done();
	});

	it('should check if models exists', (done) => {
		expect(models.categories).to.exist;
		expect(models.categories.find).to.exist;
		expect(models.categories.find).to.be.a('function');
		expect(models.categories.findOne).to.exist;
		expect(models.categories.findOne).to.be.a('function');
		expect(models.categories.insertMany).to.exist;
		expect(models.categories.insertMany).to.be.a('function');
		expect(models.categories.findOneAndUpdate).to.exist;
		expect(models.categories.findOneAndUpdate).to.be.a('function');
		expect(models.categories.findOneAndRemove).to.exist;
		expect(models.categories.findOneAndRemove).to.be.a('function');

		done();
	});

	it('should mock get all data', (done) => {
		services
			.getAll(models.categories, {})
			.then((data) => {
				expect(getfinalData(data)).to.be.a('Array');

				done();
			})
			.catch(done);
	});

	it('should mock get all data with limit', (done) => {
		services
			.getAll(models.categories, {}, { limit: 1 })
			.then((data) => {
				expect(getfinalData(data)).to.have.lengthOf(1);

				done();
			})
			.catch(done);
	});

	it('should get one data', (done) => {
		services
			.getOne(models.categories, { _id: '60dc7cd230d2f8c458f4d871' })
			.then((data) => {
				expect(data).to.be.a('Object');

				done();
			})
			.catch(done);
	});

	it('should get the mongo request', (done) => {
		expect(services.appendRequestQuery({}, 'BAR:ZZZ|FOO:XXX')).to.have.eql({ BAR: /ZZZ/i, FOO: /XXX/i });

		done();
	});
});
