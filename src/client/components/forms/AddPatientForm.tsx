import React from 'react';

export type FormState = {
  name: string
  enrollmentStatus: string
}

type FormEvent = (
  React.FormEvent<HTMLInputElement>
  | React.FormEvent<HTMLSelectElement>
);

type FormEl = HTMLInputElement | HTMLSelectElement;

const initialState: FormState = {
  name: '',
  enrollmentStatus: 'Prospect'
}

const enrollmentOpts = [
  'Prospect',
  'Insurance Eligibility Verified',
  'Enrollment Contract Signed',
  'Patient Record Created',
  'Intake Appointment Scheduled'
];

type Props = {
  onSubmit: (f: FormState) => void
};

export const AddPatientForm = (props: Props) => {

  const [form, setForm] = React.useState<FormState>(initialState);

  const onChange = (field: keyof FormState) => (e: FormEvent) => {
    e.preventDefault();
    setForm(prev => ({...prev, [field]: (e.target as FormEl).value}))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(form);
  }

  return (
    <form
      className="add-patient"
      onSubmit={onSubmit}
    >
      <h2>{"Add a Patient"}</h2>
      <label htmlFor={"name"}>
        <span>{"Patient Name"}</span>
        <input
          type="text"
          name="name"
          onChange={onChange('name')}
          required
          value={form.name}
        />
      </label>
      <label htmlFor={"enrollmentStatus"}>
        <span>{"Enrollment Status"}</span>
        <select
          onChange={onChange('enrollmentStatus')}
          required
          value={form.enrollmentStatus}
        >
          {enrollmentOpts.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </label>
      <input type="submit" name="submit" value="Submit" />
    </form>
  );
}

