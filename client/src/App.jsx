import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/health");
        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        setError("Failed to connect to backend");
      }
    };

    fetchHealth();
  }, []);

  return (
    <div>
      <h1>Job Tracker</h1>
      <p>Frontend is running.</p>
      <p>Backend message: {message}</p>
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
