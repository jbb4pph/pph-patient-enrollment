import { insertPatient } from '../cmd';
import type { Response, Request } from 'express';
import type { Patient } from '../types';

type Dict = { [k: string]: any }

const fields: (keyof Patient)[] = [ 'name', 'enrollmentStatus' ];

const validate = (form: Dict): Patient => {
  if (!form) {
    throw new Error("Form data missing from request.");
  }
  fields.forEach(f => {
    if (!form[f] || String(form[f])?.trim() === "") {
      throw new Error(`Missing field: ${f}.`);
    }
  });
  return form as Patient;
}

export const addPatient = async (
  req: Request,
  res: Response
) => {

  let form;
  try {
    form = validate(req.body);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    }
    else {
      res.status(400).json({ message: "Bad request." });
    }
    return;
  }

  try {
    await insertPatient(form);
    return res.status(200).send();
  } catch (e: unknown) {
    res.status(500).json({ message: "Internal server error." });
  }
}

