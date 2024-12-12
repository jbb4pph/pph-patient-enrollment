import { Router } from "express";
import { getPatients } from "./database/helpers";
import { addPatient, getHighestRiskProfileSegment } from "./endpoints";

const router = Router();

router.get("/api/patients", async (req, res) => {
  const patients = await getPatients();
  return res.json(patients);
});

router.post("/api/patients", addPatient);
router.get("/api/highest-risk-profile-segment", getHighestRiskProfileSegment);

export { router }
