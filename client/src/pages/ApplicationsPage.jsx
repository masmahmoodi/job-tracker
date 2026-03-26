import { useEffect, useState } from "react";
import ApplicationList from "../components/ApplicationList.jsx";
import { Link } from "react-router-dom";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

         const res = await fetch("http://127.0.0.1:5001/api/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
});
 
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

      const token = localStorage.getItem("token");

      const res = await fetch(`http://127.0.0.1:5001/api/applications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/60">
          Loading
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Fetching your pipeline...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2rem] border border-red-400/20 bg-red-500/10 px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold text-white">{error}</h1>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/[0.03] to-amber-300/10 p-6 shadow-2xl shadow-black/25 sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-200/70">
              Command Center
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {user?.name ? `${user.name}'s job pipeline` : "Your job pipeline"}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
              Keep every lead organized, spot momentum fast, and move through your search
              with a cleaner system than spreadsheets and scattered tabs.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:min-w-56">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Tracked roles</p>
              <p className="mt-3 text-4xl font-semibold text-amber-100">{applications.length}</p>
            </div>
            <Link
              to="/applications/create"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-300/20"
            >
              Add Application
            </Link>
          </div>
        </div>
      </div>

      <ApplicationList applications={applications} handleDelete={handleDelete} />
    </section>
  );
}
