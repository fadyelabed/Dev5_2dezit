export {};

declare module '*.json' {
	const value: any;
	export default value;
}

declare global {
	namespace Express {
		interface Request {
			models?: any;
		}
		interface Response {
			startTime?: number;
		}
	}
}
