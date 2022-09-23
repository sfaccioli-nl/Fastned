import { ILocationResponse } from '../components/LocationsView/LocationsView';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../helpers/requestsHelper';

export interface ILocationReqBody {
	name: string;
	location: number;
	chargers?: string[];
	city: string;
	postalCode: string;
	country: string;
}

/**
 * Get all the locations
 */
export async function getAllLocations(): Promise<ILocationResponse[]> {
	return await getRequest<ILocationResponse[]>('/api/locations').then(response => response);
}

/**
 * Get location by id
 */
export async function getLocationById(id: string): Promise<ILocationResponse> {
	return await getRequest<ILocationResponse>(`/api/locations/${id}`).then(response => response);
}

/**
 * Create a new location
 */
export async function createNewLocation(body: ILocationReqBody): Promise<ILocationResponse> {
	return await postRequest<ILocationReqBody, ILocationResponse>('/api/locations', body).then(response => response);
}

/**
 * Update a new location
 */
export async function updateLocation(body: ILocationReqBody, id: string): Promise<ILocationResponse> {
	return await patchRequest<ILocationReqBody, ILocationResponse>(`/api/locations/${id}`, body).then(response => response);
}

/**
 * Remove a location
 */
export async function removeLocationById(id: string): Promise<ILocationResponse> {
	return await deleteRequest<ILocationResponse>(`/api/locations/${id}`).then(response => response);
}
