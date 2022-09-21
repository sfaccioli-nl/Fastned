import { ILocation } from '../components/LocationsView/LocationsView';
import { getRequest, patchRequest, postRequest } from '../helpers/requestsHelper';

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
export async function getAllLocations(): Promise<ILocation[]> {
	return await getRequest<ILocation[]>('/api/locations').then(response => response);
}

/**
 * Get location by id
 */
export async function getLocationById(id: string): Promise<ILocation> {
	return await getRequest<ILocation>(`/api/locations/${id}`).then(response => response);
}

/**
 * Create a new location
 */
export async function createNewLocation(body: ILocationReqBody): Promise<ILocation> {
	return await postRequest<ILocationReqBody, ILocation>('/api/locations', body).then(response => response);
}

/**
 * Update a new location
 */
export async function updateLocation(body: ILocationReqBody, id: string): Promise<ILocation> {
	return await patchRequest<ILocationReqBody, ILocation>(`/api/locations/${id}`, body).then(response => response);
}
