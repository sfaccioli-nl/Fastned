/**
 * Generic function to get data from DB
 */
export async function getRequest<R>(endpoint: string): Promise<R> {
	return await fetch(`${process.env.REACT_APP_SERVER_URL}${endpoint}`, { method: 'GET' }).then(res => res.json());
}

/**
 * Generic function to post data to DB
 */
export async function postRequest<B, R>(endpoint: string, body: B): Promise<R> {
	return await fetch(`${process.env.REACT_APP_SERVER_URL}${endpoint}`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());
}

/**
 * Generic function to patch data to DB
 */
export async function patchRequest<B, R>(endpoint: string, body: B): Promise<R> {
	return await fetch(`${process.env.REACT_APP_SERVER_URL}${endpoint}`, {
		method: 'PATCH',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());
}

/**
 * Generic function to delete data from DB
 */
export async function deleteRequest<R>(endpoint: string): Promise<R> {
	return await fetch(`${process.env.REACT_APP_SERVER_URL}${endpoint}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());
}
