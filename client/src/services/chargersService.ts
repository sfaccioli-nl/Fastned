import { IChargerResponse } from '../components/ChargersTable/ChargersTable';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../helpers/requestsHelper';

export interface IChargerReqBody {
	type: 'HPC' | 'T52' | 'T53C';
	serialNumber: string;
	status: 'CONNECTED' | 'NOT_CONNECTED' | 'REMOVED';
	location: string;
}

/**
 * Get all the chargers
 */
export async function getAllChargers(): Promise<IChargerResponse[]> {
	return await getRequest<IChargerResponse[]>('/api/chargers').then(response => response);
}

/**
 * Get charger by id
 */
export async function getChargerById(id: string): Promise<IChargerResponse> {
	return await getRequest<IChargerResponse>(`/api/chargers/${id}`).then(response => response);
}

/**
 * Create a new charger
 */
export async function createNewCharger(body: IChargerReqBody): Promise<IChargerResponse> {
	return await postRequest<IChargerReqBody, IChargerResponse>('/api/chargers', body).then(response => response);
}

/**
 * Update a charger
 */
export async function updateCharger(body: IChargerReqBody, id: string): Promise<IChargerResponse> {
	return await patchRequest<IChargerReqBody, IChargerResponse>(`/api/chargers/${id}`, body).then(response => response);
}

/**
 * Remove a charger
 */
export async function removeChargerById(id: string): Promise<IChargerResponse> {
	return await deleteRequest<IChargerResponse>(`/api/chargers/${id}`).then(response => response);
}
