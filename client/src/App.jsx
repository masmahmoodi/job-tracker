import { useEffect, useState } from "react"

function App() {
  const [applications, setApplications] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5001/api/applications")
        const data = await res.json()
        setApplications(data)
        // if(applications.length === 0){
        //   setEmpty("No applications yet")
        // }
      } catch (err) {
        setError("Failed to fetch applications")
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <>
    {
      applications.length !== 0 ?(
      applications.map((application) => (
        <div key={application.id}>
          <h1>{application.company_name}</h1>
          <h2>{application.job_title}</h2>
          <h3>{application.status}</h3>
        </div>
      )))
      : (<h1>No applications yet</h1>)
    }
    </>
  ) 
}

export default App