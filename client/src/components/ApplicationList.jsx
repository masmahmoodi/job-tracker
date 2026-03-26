import { Link } from "react-router-dom";

export default function ApplicationList({ applications, handleDelete }) {
  return (
    <div className="mt-8">
      {applications.length !== 0 ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {applications.map((application) => (
            <article
              key={application.id}
              className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-amber-200/25 hover:bg-white/[0.07]"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/70">
                    {application.status || "Saved"}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    {application.company_name}
                  </h2>
                  <p className="mt-1 text-lg text-stone-300">{application.job_title}</p>
                </div>
                <div className="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-100">
                  #{application.id}
                </div>
              </div>

              <div className="space-y-3 text-sm text-stone-300">
                <p>
                  <span className="mr-2 font-semibold text-stone-100">Location:</span>
                  {application.location || "Not set"}
                </p>
                <p className="line-clamp-3">
                  <span className="mr-2 font-semibold text-stone-100">Notes:</span>
                  {application.notes || "No notes yet"}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/applications/${application.id}/edit`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-stone-100 transition hover:border-amber-200/30 hover:text-amber-100"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(application.id)}
                  className="rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/60">
            Pipeline Empty
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">No applications yet</h2>
          <p className="mt-3 text-stone-400">
            Start with one strong lead and build momentum from there.
          </p>
        </div>
      )}
    </div>
  );
}
