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

export async function updateApplication(id, data) {
  const {
    company_name,
    job_title,
    status,
    applied_date,
    notes,
    location,
    job_type,
    salary,
    job_link,
  } = data;

  const result = await pool.query(
    `
      UPDATE applications
      SET
        company_name = $1,
        job_title = $2,
        status = $3,
        applied_date = $4,
        notes = $5,
        location = $6,
        job_type = $7,
        salary = $8,
        job_link = $9,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
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
      id,
    ]
  );

  return result.rows[0];
}


export async function deleteApplication(id){
  const result = await pool.query(`
      DELETE FROM applications where id =$1
      RETURNING *
    `,[id])
    return result.rows[0]

}