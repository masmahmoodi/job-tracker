import {Link} from 'react-router-dom'

export default function ApplicationList({ applications, handleDelete }) {
  return (
    <>
      {applications.length !== 0 ? (
        applications.map((application) => (
          <div key={application.id}>
            <h1>{application.company_name}</h1>
            <h2>{application.job_title}</h2>
            <h3>{application.status}</h3>
            <h3>{application.location}</h3>
            <h3>{application.notes}</h3>
            <button onClick={() => handleDelete(application.id)}>Delete</button>
            <Link to={`/applications/${application.id}/edit`} >Edit </Link>
          </div>
        ))
      ) : (
        <h1>No applications yet</h1>
      )}
    </>
  );
}
