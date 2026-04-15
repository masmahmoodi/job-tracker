import pool from "../index.js"
export default async function createResume(userId,file,extractedText){
    const result = await pool.query(
        `INSERT INTO resumes(user_id,original_filename,stored_filename,file_path,mime_type,file_size,extracted_text)
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
        `,[userId,file.originalname,file.filename,file.path,file.mimetype,file.size,extractedText])
    
        return result.rows[0]

}