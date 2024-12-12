import { get_patients, patientRiskProfiles } from "./fakeDatabaseData";
import type { Patient, PatientRiskProfile, RiskProfileSegment } from "../types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const patientsById = () => (
  get_patients()
    .reduce((acc: {[patientId: number]: Patient}, patient) => {
      acc[patient.id] = patient;
      return acc;
    }, [])
);

export const patientRiskProfilesById = (
  patientRiskProfiles
    .reduce((acc: {[patientId: number]: PatientRiskProfile[]}, patient) => {
      if (!acc[patient.patientId]) {
        acc[patient.patientId] = [];
      }
      acc[patient.patientId].push(patient);
      return acc;
    }, {})
);

export const patientRiskProfilesBySegment = (
  patientRiskProfiles
    .reduce((acc: {[segmentName: string]: PatientRiskProfile[]}, prp) => {
      if (!acc[prp.segmentName]) {
        acc[prp.segmentName] = [];
      }
      acc[prp.segmentName].push(prp);
      return acc;
    }, {})
);

export async function getPatients() {
  await delay(500);
  return Object.values(patientsById());
}

export async function getPatientRiskProfiles() {
  await delay(500);
  return Object.values(patientRiskProfilesById).flat();
}
