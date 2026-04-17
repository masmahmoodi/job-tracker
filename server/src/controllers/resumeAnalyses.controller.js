import { getApplicationWithResumeForAnalysis } from "../db/queries/applications.queries.js"
import analyzeResumeAgainstJob from "../services/analyzeResumeAgainstJob.js"
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
        return res.status(200).json(aiResult)
    } catch (error) {
        console.error("POST /api/resume-analyses/:id failed:", error);
        return res.status(500).json({
            err: "AI analysis failed",
            details: error.message,
        });
    }

}
