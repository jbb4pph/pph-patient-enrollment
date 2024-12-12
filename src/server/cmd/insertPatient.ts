import { patients, add_patient } from '../database/fakeDatabaseData';
import type { Patient, NewPatient } from '../types';

export const insertPatient = async (patient: NewPatient) => {

  /**
   * FIXME This will not scale.
   * Better to use a real database with (e.g.) AUTO_INCREMENT on the pk.
   **/
  const id = Math.max.apply(null, patients.map(p => p.id)) + 1;

  const p: Patient = { id, ...patient };
  add_patient(p);
}

