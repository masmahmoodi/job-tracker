import ResumeSection from "./ResumeSection.jsx"
export default function ApplicationForm({
  handleSubmit,
  handleChange,
  form,
  submitLabel,
  sendResumeToParent
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8"
    >
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/70">
          Job Application
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Save the role, the resume, and the job details in one place
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-400 sm:text-base">
          Add the core application info, attach the resume you want to use, and keep the job
          description ready for AI resume analysis.
        </p>
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
        <div className="sm:col-span-2">
          <label htmlFor="job_description" className="mb-2 block text-sm font-medium text-stone-200">
            Job Description
          </label>
          <textarea
            id="job_description"
            name="job_description"
            onChange={handleChange}
            value={form.job_description}
            rows={6}
            className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-300/50 focus:ring-2 focus:ring-amber-200/20"
          />
        </div>
            <ResumeSection resumeId={form.resume_id} sendResumeToParent={sendResumeToParent}/>
      </div>

      <div className="mt-8 flex justify-end">
        <input
          type="submit"
          value={submitLabel || "Save Application"}
          className="w-full cursor-pointer rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-300/20 sm:w-auto"
        />
      </div>
    </form>
  );
}
