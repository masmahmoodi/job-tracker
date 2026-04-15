import {getAllApplications, createApplication, getApplicationById,updateApplication,deleteApplication} from "../db/queries/applications.queries.js"

export async function getApplications(req, res) {
  try {
    const applications = await getAllApplications(req.user.userId);
    return res.status(200).json(applications);
  } catch (err) {
    console.error("GET /api/applications failed:", err);
    return res.status(500).json({ err: "something went wrong!!" });
  }
}


export async function postApplication(req,res){
    const {company_name,
        job_title,
        } = req.body

        if(!company_name || !job_title){
            return res.status(400).json({err:"enter the required fields"})
        }

        try{
            const createdApplication = await createApplication(req.body,req.user.userId)
            return res.status(201).json(createdApplication)

        }catch(err){
            return res.status(500).json({err:"something went wrong!!"})
        }
}


export async function getApplication(req,res){
    let {id} = req.params
    if(!id){
       return  res.status(400).json({err:"bad input"})  
    }

    id = Number(id)
    if(isNaN(id)){
          return  res.status(400).json({err:"bad input"})  
    }
    try{

        const application = await getApplicationById(id, req.user.userId)
        if(!application){
            return res.status(404).json({err:"not found "})
        }
        return res.status(200).json(application)
    }catch(err){
        return res.status(500).json({err:"somthing went wrong"})  
    }
}


export async function patchApplication(req, res) {
  let { id } = req.params;

  if (!id) {
    return res.status(400).json({ err: "bad input" });
  }

  id = Number(id);

  if (isNaN(id)) {
    return res.status(400).json({ err: "bad input" });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ err: "no fields to update" });
  }

  try {
    const existingApplication = await getApplicationById(id, req.user.userId);

    if (!existingApplication) {
      return res.status(404).json({ err: "not found" });
    }

    const updatedData = {
      company_name: req.body.company_name ?? existingApplication.company_name,
      job_title: req.body.job_title ?? existingApplication.job_title,
      status: req.body.status ?? existingApplication.status,
      applied_date: req.body.applied_date ?? existingApplication.applied_date,
      notes: req.body.notes ?? existingApplication.notes,
      location: req.body.location ?? existingApplication.location,
      job_type: req.body.job_type ?? existingApplication.job_type,
      salary: req.body.salary ?? existingApplication.salary,
      job_link: req.body.job_link ?? existingApplication.job_link,
      job_description: req.body.job_description ?? existingApplication.job_description,
      resume_id:req.body.resume_id ?? existingApplication.resume_id
    };

    const updatedApplication = await updateApplication(id, updatedData, req.user.userId);

   return res.status(200).json(updatedApplication);
  } catch (err) {
    return res.status(500).json({ err: "something went wrong" });
  }
}



export async function delApplication(req,res){
    let {id} = req.params
    if(!id){
        return res.status(400).json({ err: "bad input" }) 
    }
    id = Number(id);

  if (isNaN(id)) {
    return res.status(400).json({ err: "bad input" });
  }
try{
    const deletedApplication = await deleteApplication(id, req.user.userId)
    if(!deletedApplication){
         return res.status(404).json({ err: "not found" });
    }
    return res.status(200).json({ message: "row deleted" });
}catch(err){
    return res.status(500).json({ err: "something went wrong" });
}
}