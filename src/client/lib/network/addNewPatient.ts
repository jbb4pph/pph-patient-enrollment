import { sendRequest } from './';
import type { Patient } from '../../../server/types';
import type { FormState as NewPatientForm } from '../../components';

export const addNewPatient = async (
  form: NewPatientForm
): Promise<void> => {

  const url = '/api/patients';
  return sendRequest<any>('post', url, form).then(() => {});
}

