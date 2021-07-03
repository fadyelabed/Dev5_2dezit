import { toJson, toString, isEmpty, isEmptyObject, checkObjectInList } from 'jnpl-helper';

export class Helper {
	env: string = process.env.NODE_ENV || 'local';

	constructor() {}

	toJson(jsonData: any = ''): any {
		return toJson(jsonData);
	}

	toString(jsonData: any = ''): any {
		return toString(jsonData);
	}

	isEmptyObject(obj: Object = {}): boolean {
		return isEmptyObject(obj);
	}

	isEmpty(v: any = null): boolean {
		return isEmpty(v);
	}

	validateData(obj: Object = {}, list: Array<any> = []): boolean {
		return checkObjectInList(obj, list);
	}
}
