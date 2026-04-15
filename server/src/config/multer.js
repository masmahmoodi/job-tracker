import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,path.resolve("uploads/resumes"))
    },
    filename(req,file,cb){
        const extension = path.extname(file.originalname).toLowerCase()
        const uniqueName = `${Date.now()}${extension}`
        cb(null, uniqueName)
        
    }
})



const upload = multer({
    storage,
    fileFilter(req, file, cb) {
  const isPdfMimeType = file.mimetype === "application/pdf";
  const hasPdfExtension = path.extname(file.originalname).toLowerCase() === ".pdf";

  if (isPdfMimeType && hasPdfExtension) {
    cb(null, true);
    return;
  }

  cb(new Error("Only PDF files are allowed"));
},
limits: {
  fileSize: 5 * 1024 * 1024,
},


})



export default upload