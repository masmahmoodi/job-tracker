import pool from "../index.js"

export default async function createResumeAnalysis(data){
    const {applicationId,resumeId,summary,strengths,missingKeywords,suggestions} = data
    const result = await pool.query(`
            INSERT INTO resume_analyses(application_id ,
                    resume_id ,
                    summary ,
                    strengths ,
                    missing_keywords ,
                    suggestions
                    )VALUES($1,$2,$3,$4,$5,$6)
                    RETURNING  *
        `,[applicationId,resumeId,summary,strengths,missingKeywords,suggestions])

        return result.rows[0]
}

