export default function ApplicationForm({ handleSubmit, handleChange, form }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="company_name"
        onChange={handleChange}
        value={form.company_name}
      />
      <input
        type="text"
        name="job_title"
        onChange={handleChange}
        value={form.job_title}
      />
      <input type="submit" value="submit" />
    </form>
  );
}
