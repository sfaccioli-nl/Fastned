import { deleteRequest, getRequest, patchRequest, postRequest } from '../helpers/requestsHelper';

export interface ICountry {
	name: string;
	code: string;
	updatedAt: string;
}

export interface ICountryResponse extends ICountry {
	msg: string;
}

export interface ICountryReqBody {
	name: string;
	code: string;
}

/**
 * Get all the countries
 */
export async function getAllCountries(): Promise<ICountryResponse[]> {
	return await getRequest<ICountryResponse[]>('/api/countries').then(response => response);
}

/**
 * Get country by id
 */
export async function getCountryById(id: string): Promise<ICountryResponse> {
	return await getRequest<ICountryResponse>(`/api/countries/${id}`).then(response => response);
}

/**
 * Create a new country
 */
export async function createNewCountry(body: ICountryReqBody): Promise<ICountryResponse> {
	return await postRequest<ICountryReqBody, ICountryResponse>('/api/countries', body).then(response => response);
}

/**
 * Update a country
 */
export async function updateCountry(body: ICountryReqBody, id: string): Promise<ICountryResponse> {
	return await patchRequest<ICountryReqBody, ICountryResponse>(`/api/countries/${id}`, body).then(response => response);
}

/**
 * Remove a country
 */
export async function removeCountryById(id: string): Promise<ICountryResponse> {
	return await deleteRequest<ICountryResponse>(`/api/countries/${id}`).then(response => response);
}
