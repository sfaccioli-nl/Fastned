import { ILocation } from '../components/LocationsView/LocationsView';
import { getRequest, postRequest } from '../helpers/requestsHelper';

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
 * Create a new location
 */
export async function createNewLocation(body: ILocationReqBody): Promise<ILocation> {
	return await postRequest<ILocationReqBody, ILocation>('/api/locations', body).then(response => response);
}
