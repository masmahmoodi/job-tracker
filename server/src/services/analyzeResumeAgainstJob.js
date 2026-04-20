import buildResumeAnalysisPrompt  from "./prompts/resumeAnalysisPrompt.js"
import getGeminiModel from "./geminiService.js"

function normalizeAnalysisResult(parsedResult) {
    return {
        summary:
            typeof parsedResult?.summary === "string" && parsedResult.summary.trim()
                ? parsedResult.summary.trim()
                : "No summary available.",
        strengths: Array.isArray(parsedResult?.strengths) ? parsedResult.strengths : [],
        missing_keywords: Array.isArray(parsedResult?.missing_keywords)
            ? parsedResult.missing_keywords
            : [],
        suggestions: Array.isArray(parsedResult?.suggestions) ? parsedResult.suggestions : [],
    }
}

function parseAnalysisResponse(text) {
    const cleanedText = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/, "")
        .trim()

    try {
        return normalizeAnalysisResult(JSON.parse(cleanedText))
    } catch (error) {
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)

        if (!jsonMatch) {
            throw new Error("Gemini returned invalid JSON")
        }

        return normalizeAnalysisResult(JSON.parse(jsonMatch[0]))
    }
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function analyzeResumeAgainstJob(resumeText,jobDescription){
    const model =  getGeminiModel()
    const prompt = buildResumeAnalysisPrompt(resumeText,jobDescription)

    let lastError

    for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
            const result = await model.generateContent(prompt)
            const response = await result.response
            const text = await response.text()

            return parseAnalysisResponse(text)
        } catch (error) {
            lastError = error

            if (attempt === 0) {
                await wait(700)
            }
        }
    }

    throw lastError
}
