import { patientRiskProfiles as prp } from '../database/fakeDatabaseData';
import { patientRiskProfilesById } from '../database/helpers';
import { extractCoefficients as extract, sum } from './';
import type { PatientRiskProfile } from "../types";

export const calcRAFScore = (id: number): number|undefined => {

  const patientRecords = patientRiskProfilesById[id]
    ?.filter(p => !p.deletedAt) ?? []; // OMIT deleted entries.
  const demoCoef = extract(patientRecords, 'demographicCoefficients');
  const diagCoef = extract(patientRecords, 'diagnosisCoefficients');
  return (!demoCoef.length && !diagCoef.length)
    ? undefined
    : sum(demoCoef) + sum(diagCoef);
}

