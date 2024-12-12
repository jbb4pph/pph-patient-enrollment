import React from 'react';
import { usePatients } from '../lib/hooks';
import { AddPatientForm, PatientTable } from '../components';
import type { FormState as NewPatientForm } from '../components';

export const Patients = () => {

  const {
    addPatient,
    error,
    getHighestRiskProfileSegment,
    highestRiskProfileSegment: hrps,
    patients,
    loading,
    load
  } = usePatients();

  const [showForm, setShowForm] = React.useState<boolean>(false);

  const toggleForm = () => setShowForm(prev => !prev);

  const onSubmitNewPatient = (form: NewPatientForm) => {
    addPatient(form)
      .then(() => {
        load();
        setShowForm(false);
      })
      .catch(e => {
        console.error(e);
        setShowForm(false);
      });
  }

  React.useEffect(() => {
    load();
    getHighestRiskProfileSegment();
  }, []);

  return (
    <main>
      <h1>{"Manage Patients"}</h1>
      {!!loading && (
        <div className="modal">
          <div>
            <div className="loading">{"Loading Patients..."}</div>
          </div>
        </div>
      )}
      {!!patients?.length && (
        <PatientTable
          patients={patients}
          toggleForm={toggleForm}
        />
      )}
      {!!error && (
        <div className="error-msg">{error}</div>
      )}
      {!!hrps && (
        <div className="hrps">
          <h2>{"Risk Profile Segment Analysis"}</h2>
          <p>{"This segment has the highest average RAF score across all patients:"}</p>
          <div>
            <span>{`${hrps.name}:`}</span>
            <span>{`${hrps.score}`}</span>
          </div>
        </div>
      )}
      {!!showForm && (
        <div className="modal">
          <div>
            <AddPatientForm onSubmit={onSubmitNewPatient} />
            <button className="close" onClick={toggleForm}>
              <span>{"x"}</span>
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

