import { getApplicationWithResumeForAnalysis } from "../db/queries/applications.queries.js"
import analyzeResumeAgainstJob from "../services/analyzeResumeAgainstJob.js"
import createResumeAnalysis from "../db/queries/resumeAnalyses.queries.js"
export default async  function analyzeApplicationResume(req,res){
    try {
        let {id} = req.params
        if(!id){
            return res.status(404).json({err:"application not found"})
        }

        id = Number(id)

        if(isNaN(id)){
            return res.status(400).json({err:"bad input "})
        }

        const result = await getApplicationWithResumeForAnalysis(id,req.user.userId)
        if(!result){
            return res.status(404).json({err:"applicatoin not found "})
        }

        const aiResult = await analyzeResumeAgainstJob(result.extracted_text, result.job_description)
        const aiAnalysis = await createResumeAnalysis(result,aiResult)
        if(!aiAnalysis){
            return res.status(404).json({err:"not found"})
        }

        return res.status(200).json({
            id :aiAnalysis.id,
            application_id: aiAnalysis.application_id,
            resume_id: aiAnalysis.resume_id,
            summary: aiAnalysis.summary,
            strengths: JSON.parse(aiAnalysis.strengths),
           missing_keywords: JSON.parse(aiAnalysis.missing_keywords),
           suggestions: JSON.parse(aiAnalysis.suggestions)


        })
    } catch (error) {
        console.error("POST /api/resume-analyses/:id failed:", error);
        return res.status(500).json({
            err: "AI analysis failed",
            details: error.message,
        });
    }

}
