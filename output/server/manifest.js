const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.aa1f58db.js","app":"_app/immutable/entry/app.6193831d.js","imports":["_app/immutable/entry/start.aa1f58db.js","_app/immutable/chunks/scheduler.778706d8.js","_app/immutable/chunks/singletons.a15aa26d.js","_app/immutable/chunks/index.f93166ce.js","_app/immutable/entry/app.6193831d.js","_app/immutable/chunks/scheduler.778706d8.js","_app/immutable/chunks/index.998260d7.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-008e34a6.js')),
			__memo(() => import('./chunks/1-763b3748.js')),
			__memo(() => import('./chunks/2-1b32de68.js')),
			__memo(() => import('./chunks/3-6503ae1c.js')),
			__memo(() => import('./chunks/4-8bf92e99.js')),
			__memo(() => import('./chunks/5-151af1e0.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/locations",
				pattern: /^\/locations\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/locations/[locationId=integer]",
				pattern: /^\/locations\/([^/]+?)\/?$/,
				params: [{"name":"locationId","matcher":"integer","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			const { match: integer } = await import ('./chunks/integer-2c1bdfc8.js');
			return { integer };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
