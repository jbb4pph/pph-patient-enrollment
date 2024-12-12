import { sendRequest } from './';
import type { HighestRiskProfileSegment as HRPS } from '../../../server/types';

type Res = { hrps: HRPS };

export const getHighestRiskProfileSegment = async (): Promise<HRPS> => {

  const url = '/api/highest-risk-profile-segment';
  return sendRequest<Res>('get', url).then(r => {
    return r.hrps;
  });
}

