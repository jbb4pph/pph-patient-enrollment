import React from 'react';
import type { Patient } from '../../../server/types';

type Props = {
  patients: Patient[]
  toggleForm: () => void
};

export const PatientTable = (props: Props) => {

  const { patients, toggleForm } = props;

  return (
    <table className="patients">
      <caption>
        <span>{"Patients"}</span>
        <button className="add" onClick={toggleForm}>
          {"Add Patient"}
        </button>
      </caption>
      <thead>
        <tr>
          <th scope="col">{"ID"}</th>
          <th scope="col">{"Name"}</th>
          <th scope="col">{"Enrollment Status"}</th>
          <th scope="col">{"RAF Score"}</th>
        </tr>
      </thead>
      <tbody>
        {patients.map(p => (
          <tr key={p.id}>
            <th scope="row">{p.id}</th>
            <td>{p.name}</td>
            <td>{p.enrollmentStatus}</td>
            <td>{p.rafScore ?? "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

