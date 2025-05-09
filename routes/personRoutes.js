const express=require("express")
const router=express.Router();
const Person=require("../models/Person")

router.post("/",async(req,res)=>{
    const data=req.body;
    const newPerson=await Person.create({
        name:data.name,
        age:data.age,
        mobile:data.mobile,
        email:data.email,
        work:data.work,
        salary:data.salary
    })
    return res.status(201).json({msg:"Success"})

})

router.get("/",async(req,res)=>{
    const data=await Person.findOne();
    return res.status(200).json(data)
})

router.get("/:work",async(req,res)=>{
    try{
    const workType=req.params.work;
    if(workType=="chef"||workType=="manager"||workType=="waiter"){
        const response=await Person.find({work:workType});
        return res.status(200).json(response)
    }
    else{
        return res.status(404).json({msg:"Invalid work type"})
    }}
    catch(err){
        return res.status(500).json({err:"Internal server error"})
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const updatedPerson=req.body;
        const response= await Person.findByIdAndUpdate(id,updatedPerson,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({err:"Person not found"})
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({err:"Internal server error"})
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const response=await Person.findByIdAndRemove(id);
        if(!response){
            return res.status(404).json({err:"Person not found"})
        }
        return res.status(200).json({msg:"Person deleted successfuly"})
    } catch (error) {
        return res.status(500).json({err:"Internal server error"})
    }
})

module.exports=router;
