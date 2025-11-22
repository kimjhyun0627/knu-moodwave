export const config = {
	runtime: 'edge',
};

export default async function handler(req: Request) {
	const requestUrl = new URL(req.url);

	console.log('[Test API] Request received:', {
		method: req.method,
		pathname: requestUrl.pathname,
		search: requestUrl.search,
		url: req.url,
		timestamp: new Date().toISOString(),
	});

	return new Response(
		JSON.stringify({
			status: 'ok',
			message: 'Test API is working!',
			timestamp: new Date().toISOString(),
			method: req.method,
			path: requestUrl.pathname,
			query: requestUrl.search,
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
}
