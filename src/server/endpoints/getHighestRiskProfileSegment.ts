import { calcHighestRiskProfileSegment } from '../lib';
import type { Request, Response } from 'express';

export const getHighestRiskProfileSegment = async (
  req: Request,
  res: Response
) => {

  try {
    const hrps = calcHighestRiskProfileSegment();
    return res.status(200).json({ hrps });
  } catch (e) {
    res.status(500).json({ message: "Internal server error." });
  }
}
