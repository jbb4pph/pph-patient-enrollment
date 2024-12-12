import React from 'react';
import {
  addNewPatient,
  getHighestRiskProfileSegment as getHRPS,
  getPatients
} from '../network';
import type {
  HighestRiskProfileSegment as HRPS,
  Patient
} from '../../../server/types';
import type { FormState as NewPatientForm } from '../../components';

export type PatientControls = {
  addPatient: (f: NewPatientForm) => Promise<void>
  error?: string
  getHighestRiskProfileSegment: () => Promise<void>
  highestRiskProfileSegment: HRPS
  load: () => Promise<void>
  loading: boolean
  patients: Patient[]
}

export const usePatients = (): PatientControls => {

  /**
   * FIXME The state management here is a dreadful mess.
   * I would have used a reducer. Perhaps React.useReducer
   * or maybe Redux.
   **/
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [hrps, setHrps] = React.useState<HRPS|undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingHRPS, setLoadingHRPS] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string|undefined>(undefined);
  const [hrpsError, setHrpsError] = React.useState<string|undefined>(undefined);
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const addPatient = async (form: NewPatientForm) => {
    setSubmitting(true);
    setError(undefined);
    return addNewPatient(form)
      .then(() => {
        setSubmitting(false);
      })
      .catch(e => {
        setSubmitting(false);
        setError("Could not add new patient. "+e.response?.data?.message);
        console.error(e.message);
        throw e;
      })
  }

  const getHighestRiskProfileSegment = async () => {
    setLoadingHRPS(true);
    setHrpsError(undefined);
    return getHRPS()
      .then(r => {
        setHrps(r);
        setLoadingHRPS(false);
      })
      .catch(() => {
        setHrpsError("Could not fetch Highest Risk Profile Segment.");
        setLoadingHRPS(false);
      });
  }

  const load = async () => {
    setLoading(true);
    setError(undefined);
    return getPatients()
      .then(p => {
        setPatients(p);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not fetch patients.");
        setLoading(false);
      });
  }

  return {
    addPatient,
    error,
    getHighestRiskProfileSegment,
    highestRiskProfileSegment: hrps,
    load,
    loading,
    patients
  };
}

