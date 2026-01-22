const Task=require('../models/task')

exports.tasksreg=async(req,res)=>{
    //method1 :

    // const {title,description,status} = req.body
    // const existingTitle=await Task.findOne({title})
    // if(existingTitle){
    //     res.status(400).json({message:"title already existing"})
    // }
    // const tasksreg=await Task.create({
    //     title,
    //     description,
    //     status
    // })
    // res.status(201).json({msg:"Project Details Created Successfully"})


    //method 2 : 

    try{
        const task = await Task.create({
            title : req.body.title,
            description : req.body.description,
            status : req.body.status || 'pending',
            user : req.body.id,
        })
        res.status(201).json({msg : 'task created successfully'})
    }
    catch(error){
        res.status(500).send(error);
    }
}