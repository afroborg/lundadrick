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
	const { response } = data;

	if (response.status === 401) {
		goto('/');
	}

	return data;
});

interface HttpRequestOptions {
	query?: Record<string, string>;
	headers?: Record<string, string>;
}

const queryString = (query: Record<string, string>) => {
	if (Object.keys(query).length === 0) {
		return '';
	}

	return `?${Object.entries(query)
		.map(([key, value]) => `${key}=${value}`)
		.join('&')}`;
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
