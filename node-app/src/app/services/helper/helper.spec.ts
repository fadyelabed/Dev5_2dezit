import { expect } from 'chai';
import { Helper } from './helper.service';

describe('helper service', () => {
	let services;

	beforeEach((done) => {
		services = new Helper();
		done();
	});

	it('should get the expected json data', (done) => {
		expect(services.toJson('{"test": "test-data"}')).to.eql({ test: 'test-data' });

		done();
	});

	it('should get the expected string data', (done) => {
		expect(services.toString({ test: 'test-data' })).to.equal('{"test":"test-data"}');

		done();
	});

	it('should check if empty object and array', (done) => {
		expect(services.isEmptyObject({})).to.be.true;
		expect(services.isEmptyObject({ test: 'script' })).to.be.false;

		done();
	});

	it('should check if data is empty', (done) => {
		expect(services.isEmpty('')).to.be.true;
		expect(services.isEmpty('xxx')).to.be.false;

		done();
	});

	it('should check if data on array exists', (done) => {
		expect(services.validateData({ test: 'test-data' }, ['test'])).to.be.true;

		done();
	});
});
