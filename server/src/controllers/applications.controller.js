import {getAllApplications, createApplication, getApplicationById} from "../db/queries/applications.queries.js"

export async function getApplications(req,res){
    try{

        const applications = await getAllApplications()
        return res.status(200).json(applications )
    }catch(err){
        return res.status(500).json({err:"something went wrong!!"})
        
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
            const createdApplication = await createApplication(req.body)
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

        const application = await getApplicationById(id)
        if(!application){
            return res.status(404).json({err:"not found "})
        }
        return res.status(200).json(application)
    }catch(err){
        return res.status(500).json({err:"somthing went wrong"})  
    }
}
