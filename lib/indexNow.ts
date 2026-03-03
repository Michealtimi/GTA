import fetch from 'node-fetch';

/**
 * Notify a single URL to an IndexNow-compliant search engine.
 *
 * @param url The URL that changed
 * @param key Your IndexNow key (hex string)
 * @param endpoint Hostname of search engine e.g. "www.bing.com" or your own provider
 * @param keyLocation optional URL of the key file, required when the file is not at the root
 */
export async function notifyUrl(
	url: string,
	key: string,
	endpoint: string = 'www.bing.com',
	keyLocation?: string,
) {
	const searchUrl = `https://${endpoint}/indexnow?url=${encodeURIComponent(
		url,
	)}&key=${encodeURIComponent(key)}${
		keyLocation ? `&keyLocation=${encodeURIComponent(keyLocation)}` : ''
	}`;
	const res = await fetch(searchUrl);
	if (!res.ok) {
		throw new Error(`IndexNow notify failed: ${res.status} ${res.statusText}`);
	}
	return res.status;
}

/**
 * Submit multiple URLs in a single POST request.
 *
 * @param urls list of absolute URLs (>1) to notify
 * @param key your IndexNow key
 * @param host the host portion of your URLs (e.g. "www.example.com")
 * @param endpoint endpoint hostname (defaults to bing)
 * @param keyLocation optional location of the key file
 */
export async function notifyUrls(
	urls: string[],
	key: string,
	host: string,
	endpoint: string = 'www.bing.com',
	keyLocation?: string,
) {
	if (urls.length === 0) {
		return null;
	}

	const body: any = { host, key, urlList: urls };
	if (keyLocation) body.keyLocation = keyLocation;

	const res = await fetch(`https://${endpoint}/indexnow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify(body),
	});
	if (!res.ok) {
		throw new Error(`IndexNow batch notify failed: ${res.status} ${res.statusText}`);
	}
	return res.status;
}
