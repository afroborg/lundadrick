import { goto } from '$app/navigation';
import { config } from '@/config';
import axios from 'axios';

const api = axios.create({
	baseURL: config.API_URL,
	transformRequest: (data, headers) => {
		headers['x-ld-pw'] = localStorage.getItem('ld-token');

		return data;
	}
});

api.interceptors.response.use(null, (data) => {
	// Remove password if failed
	localStorage.removeItem(config.LOCALSTORAGE_KEY);

	const { response = {} } = data;

	// If user error (auth failed)
	if ([400, 401, 403, undefined].includes(response.status)) {
		if (window.location.pathname !== '/') {
			goto('/');
		}
		throw data;
	}

	throw data;
});

interface HttpRequestOptions {
	query?: Record<string, string>;
	headers?: Record<string, string>;
}

const queryString = (query: Record<string, string>) => {
	const entries = Object.entries(query);

	if (entries.length === 0) {
		return '';
	}

	return `?${entries.map(([key, value]) => `${key}=${value}`).join('&')}`;
};

export const getAsync = <T>(
	endpoint: string,
	{ query = {}, headers = {} }: HttpRequestOptions = {}
) =>
	api
		.get<T>(endpoint + queryString(query), { headers })
		.then(({ data }) => data);

export const postAsync = <T>(
	endpoint: string,
	body?: Record<string, string>,
	{ query = {}, headers = {} }: HttpRequestOptions = {}
) =>
	api
		.post<T>(endpoint + queryString(query), body, { headers })
		.then(({ data }) => data);
