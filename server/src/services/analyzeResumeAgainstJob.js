import buildResumeAnalysisPrompt  from "./prompts/resumeAnalysisPrompt.js"
import getGeminiModel from "./geminiService.js"
export default async function analyzeResumeAgainstJob(resumeText,jobDescription){
    const model =  getGeminiModel()
    const prompt = buildResumeAnalysisPrompt(resumeText,jobDescription)
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = await response.text()
    return JSON.parse(text)
}