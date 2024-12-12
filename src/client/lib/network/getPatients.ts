import { sendRequest } from './';
import type { Patient } from '../../../server/types';

export const getPatients = async (): Promise<Patient[]> => {

  const url = '/api/patients';
  return sendRequest<Patient[]>('get', url);
}

