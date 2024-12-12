import { patientRiskProfiles as prp } from '../database/fakeDatabaseData';
import { patientRiskProfilesBySegment } from '../database/helpers';
import { extractCoefficients as extract, sum } from './';
import type {
  HighestRiskProfileSegment as HRPS,
  PatientRiskProfile,
  RiskProfileSegment
} from "../types";

/**
 * @return RiskProfileSegment[] A list of unique segment names.
 **/
const getSegments = (): RiskProfileSegment[] => {
  return Object.keys(patientRiskProfilesBySegment) as RiskProfileSegment[];
};

type Score = [RiskProfileSegment, number];

export const calcHighestRiskProfileSegment = (): HRPS => {

  const segments = getSegments();
  const scores: Score[] = [];
  segments.forEach(s => {
    const records = patientRiskProfilesBySegment[s]
      .filter(prp => !prp.deletedAt); // OMIT deleted records.
    const demoCoef = extract(records, 'demographicCoefficients');
    const diagCoef = extract(records, 'diagnosisCoefficients');
    const score = (!demoCoef.length && !diagCoef.length)
      ? undefined
      : sum(demoCoef) + sum(diagCoef);
    if (score !== undefined) {
      // This ensures the largest score will be at index 0.
      const method = (score > scores[0]?.[1] ?? 0) ? 'unshift' : 'push';
      scores[method]([s, score]);
    }
  });
  if (!scores[0]) {
    throw new Error("No scores found.");
  }
  return {
    name: scores[0][0],
    score: scores[0][1]
  };
}

