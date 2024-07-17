// Helper function to serialize cookie
export function serializeCookie(name: string, value: string, options: any): string {
	let serialized = `${name}=${encodeURIComponent(value)}`;

	if (options) {
		if (options.maxAge) serialized += `; Max-Age=${options.maxAge}`;
		if (options.domain) serialized += `; Domain=${options.domain}`;
		if (options.path) serialized += `; Path=${options.path}`;
		if (options.expires) serialized += `; Expires=${options.expires.toUTCString()}`;
		if (options.httpOnly) serialized += `; HttpOnly`;
		if (options.secure) serialized += `; Secure`;
		if (options.sameSite) serialized += `; SameSite=${options.sameSite}`;
	}

	return serialized;
}
