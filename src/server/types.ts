type EnrollmentStatus =
  "Prospect"
  | "Insurance Eligibility Verified"
  | "Enrolled Contract Sent"
  | "Enrolled Contract Signed"
  | "Patient Record Created"
  | "Intake Appointment Scheduled";

export type Patient = NewPatient & {
  id: number;
  rafScore?: number
}

export type NewPatient = {
  name: string;
  enrollmentStatus: EnrollmentStatus;
}

export type RiskProfileSegment = "CFA" | "CFD" | "CNA" | "CND" | "CPA" | "CPD" | "INS" | "NE" | "SNPNE";

export type HighestRiskProfileSegment = {
  name: RiskProfileSegment
  score: number
}

export type PatientRiskProfile = {
  deletedAt?: Date;
  demographicCoefficients?: (number | null)[];
  diagnosisCoefficients?: (number | null)[];
  segmentDescription: string;
  segmentName: RiskProfileSegment;
  patientId: number;
}
