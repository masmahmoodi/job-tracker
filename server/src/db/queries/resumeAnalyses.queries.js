import pool from "../index.js";

export default async function createResumeAnalysis(result, aiResult) {
  const strengths = Array.isArray(aiResult?.strengths) ? aiResult.strengths : [];
  const missingKeywords = Array.isArray(aiResult?.missing_keywords)
    ? aiResult.missing_keywords
    : [];
  const suggestions = Array.isArray(aiResult?.suggestions) ? aiResult.suggestions : [];
  const summary =
    typeof aiResult?.summary === "string" && aiResult.summary.trim()
      ? aiResult.summary.trim()
      : "No summary available.";

  const queryResult = await pool.query(
    `
      INSERT INTO resume_analyses (
        application_id,
        resume_id,
        summary,
        strengths,
        missing_keywords,
        suggestions
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
    [
      result.id,
      result.resume_id,
      summary,
      JSON.stringify(strengths),
      JSON.stringify(missingKeywords),
      JSON.stringify(suggestions),
    ]
  );

  return queryResult.rows[0];
}
