import { Link } from 'react-router-dom';

export function Root() {
    return (
        <div>
            <h1>Root</h1>
            <Link to="/patients">{"Patients"}</Link>
        </div>
    )
}
