export default function ApplicationForm({
  handleSubmit,
  handleChange,
  form,
  submitLabel,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8"
    >
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/70">
          Application Details
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Make every opportunity easy to track
        </h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="company_name" className="mb-2 block text-sm font-medium text-stone-200">
            Company Name
          </label>
          <input
            id="company_name"
            type="text"
            name="company_name"
            onChange={handleChange}
            value={form.company_name}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-300/50 focus:ring-2 focus:ring-amber-200/20"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="job_title" className="mb-2 block text-sm font-medium text-stone-200">
            Job Title
          </label>
          <input
            id="job_title"
            type="text"
            name="job_title"
            onChange={handleChange}
            value={form.job_title}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-300/50 focus:ring-2 focus:ring-amber-200/20"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="status" className="mb-2 block text-sm font-medium text-stone-200">
            Status
          </label>
          <select
            id="status"
            name="status"
            onChange={handleChange}
            value={form.status}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-amber-300/50 focus:ring-2 focus:ring-amber-200/20"
          >
          <option value="">Select status</option>
          <option value="saved">Saved</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
          </select>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="location" className="mb-2 block text-sm font-medium text-stone-200">
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            onChange={handleChange}
            value={form.location}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-300/50 focus:ring-2 focus:ring-amber-200/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className="mb-2 block text-sm font-medium text-stone-200">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            onChange={handleChange}
            value={form.notes}
            rows={6}
            className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-300/50 focus:ring-2 focus:ring-amber-200/20"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <input
          type="submit"
          value={submitLabel || "Save Application"}
          className="cursor-pointer rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-300/20"
        />
      </div>
    </form>
  );
}
