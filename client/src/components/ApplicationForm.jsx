export default function ApplicationForm({
  handleSubmit,
  handleChange,
  form,
  submitLabel,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="company_name">Company Name</label>
      <input
        id="company_name"
        type="text"
        name="company_name"
        onChange={handleChange}
        value={form.company_name}
      />

      <label htmlFor="job_title">Job Title</label>
      <input
        id="job_title"
        type="text"
        name="job_title"
        onChange={handleChange}
        value={form.job_title}
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        name="status"
        onChange={handleChange}
        value={form.status}
      >
          <option value="">Select status</option>
          <option value="saved">Saved</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
      </select>


      <label htmlFor="location">Location</label>
      <input
        id="location"
        type="text"
        name="location"
        onChange={handleChange}
        value={form.location}
      />

      <label htmlFor="notes">Notes</label>
      <textarea
        id="notes"
        name="notes"
        onChange={handleChange}
        value={form.notes}
      />

      <input type="submit" value={submitLabel} />
    </form>
  );
}
