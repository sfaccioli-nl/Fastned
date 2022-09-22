import { ICharger } from '../components/ChargersTable/ChargersTable';
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
export async function getAllChargers(): Promise<ICharger[]> {
	return await getRequest<ICharger[]>('/api/chargers').then(response => response);
}

/**
 * Get charger by id
 */
export async function getChargerById(id: string): Promise<ICharger> {
	return await getRequest<ICharger>(`/api/chargers/${id}`).then(response => response);
}

/**
 * Create a new charger
 */
export async function createNewCharger(body: IChargerReqBody): Promise<ICharger> {
	return await postRequest<IChargerReqBody, ICharger>('/api/chargers', body).then(response => response);
}

/**
 * Update a charger
 */
export async function updateCharger(body: IChargerReqBody, id: string): Promise<ICharger> {
	return await patchRequest<IChargerReqBody, ICharger>(`/api/chargers/${id}`, body).then(response => response);
}

/**
 * Remove a charger
 */
export async function removeChargerById(id: string): Promise<ICharger> {
	return await deleteRequest<ICharger>(`/api/chargers/${id}`).then(response => response);
}
