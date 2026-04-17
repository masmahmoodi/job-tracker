import pool from "../index.js";

export async function getAllApplications(user_id) {
  const result = await pool.query(`
    SELECT * FROM applications WHERE user_id =$1
    ORDER BY created_at DESC
  `, [user_id])

  return result.rows;
}

export async function createApplication(data,user_id) {
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
    job_description,
    resume_id
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
        job_link,
        user_id,
        job_description,
        resume_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12)
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
      user_id,
      job_description,
      resume_id    
    ]
  )

  return result.rows[0];
}


export async function getApplicationById(id,user_id){
  const result = await pool.query(`
    select * from applications where id = $1 AND user_id = $2
    `,[id, user_id])
    return result.rows[0]

}

export async function updateApplication(id, data,user_id) {
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
    job_description,
    resume_id
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
        job_description = $10,
        resume_id =$11,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $12 AND user_id = $13
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
      job_description,
      resume_id,
      id,
      user_id
    ]
  );

  return result.rows[0];
}


export async function deleteApplication(id,user_id){
  const result = await pool.query(`
      DELETE FROM applications where id =$1 AND user_id=$2
      RETURNING *
    `,[id,user_id])
    return result.rows[0]

}


export async function getApplicationWithResumeForAnalysis(applicationId, userId) {
  const result = await pool.query(
    `
      SELECT
        applications.id,
        applications.job_description,
        applications.resume_id,
        resumes.extracted_text
      FROM applications
      INNER JOIN resumes ON resumes.id = applications.resume_id
      WHERE applications.id = $1 AND applications.user_id = $2
    `,
    [applicationId, userId]
  );

  return result.rows[0];
}
