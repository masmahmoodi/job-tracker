import {extractTextFromPdf} from "../services/pdfExtract.js"
import createResume from "../db/queries/resumes.queries.js"
export default async function uploadResume(req, res) {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ err: "Resume file is required" });
  }
 try{
   
   const extractedText = await extractTextFromPdf(file.path)
   const resume = await createResume(req.user.userId,file,extractedText)
   if (resume){
     return res.status(200).json({
       message: "Resume uploaded successfully",
       file: {
         originalname: file.originalname,
         filename: file.filename,
         mimetype: file.mimetype,
         size: file.size,
         path: file.path,
       },
       extractedText,
       resume
     });
   }
   return res.status(400).json({err:"something went wrong"})
 }catch(err){
  console.error(err)
  return res.status(500).json({err:"internal Server Error"})

 }
}
