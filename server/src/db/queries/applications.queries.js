import pool from "../index.js";

export async function getAllApplications() {
  const result = await pool.query(`
    SELECT * FROM applications
    ORDER BY created_at DESC
  `)

  return result.rows;
}

export async function createApplication(data) {
  const {
    company_name,
    job_title,
    status = "saved",
    applied_date,
    notes,
    location,
    job_type,
    salary,
    job_link,
  } = data;

  const result = await pool.query(
    `
      INSERT INTO applications (
        company_name,
        job_title,
        status,
        applied_date,
        notes,
        location,
        job_type,
        salary,
        job_link
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `,
    [
      company_name,
      job_title,
      status,
      applied_date,
      notes,
      location,
      job_type,
      salary,
      job_link,
    ]
  )

  return result.rows[0];
}


export async function getApplicationById(id){
  const result = await pool.query(`
    select * from applications where id = $1
    `,[id])
    return result.rows[0]

}