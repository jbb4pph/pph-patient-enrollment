import type { PatientRiskProfile } from "../types";

type Field = 'demographicCoefficients' | 'diagnosisCoefficients';

/**
 * @method extractCoefficients
 * Extract the non-null coefficients from a list of PRP records.
 **/
export const extractCoefficients = (
  prp: PatientRiskProfile[],
  field: Field
): number[] => (
  prp
    .map(p => p[field])
    .flat()
    .filter(n => !!n)
) as number[];

