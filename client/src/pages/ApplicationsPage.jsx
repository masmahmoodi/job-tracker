import { useEffect, useState } from "react";
import ApplicationList from "../components/ApplicationList.jsx";
import {Link } from "react-router-dom"
export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5001/api/applications");
        if(!res.ok){
          throw new Error("nothing to fetch")
        }
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        setError("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  async function handleDelete(id) {
    try {
      setError("");

      const res = await fetch(`http://127.0.0.1:5001/api/applications/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete application");
      }

      setApplications((prevApplications) =>
        prevApplications.filter((application) => application.id !== id)
      );
    } catch (err) {
      setError("Failed to delete application");
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (

  <>
   <Link to='/applications/create'>Create Applications</Link>
   <ApplicationList applications={applications} handleDelete={handleDelete} />
  </>
)
}
