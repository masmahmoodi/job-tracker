export default function buildResumeAnalysisPrompt(resumeText, jobDescription) {
  return `
You are an assistant that analyzes a candidate's resume against a job description.

Resume Text:
${resumeText}

Job Description:
${jobDescription}

Analyze how well the resume matches the job description.

Return valid JSON only with exactly these keys:
{
  "summary": "",
  "strengths": [],
  "missing_keywords": [],
  "suggestions": []
}

Do not wrap the JSON in markdown or code fences.
`;
}
