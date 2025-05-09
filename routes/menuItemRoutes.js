const express=require("express")
const router=express.Router();
const Menu=require("../models/MenuItem")

router.get("/", async (req,res)=>{
    const menudata= await Menu.find();
    res.status(200).json(menudata);
})

router.post("/", async(req,res)=>{
    const body=req.body;
    const menuItems= Menu.create({
        name:body.name,
        price:body.price,
        taste:body.taste,
        ingredients:body.ingredients,
        is_drink:body.is_drink,
        num_sales:body.num_sales
    })
    return res.status(201).json({msg:"Menu added"})
})

router.get("/:taste",async(req,res)=>{
    try{
    const tasteType=req.params.taste;
    if(tasteType=="Spicy"|| tasteType=="Sour"|| tasteType=="Sweet"){
        const response=await Menu.find({taste:tasteType});
        return res.status(200).json(response)
    }
    else{
        return res.status(404).json({msg:"Invalid taste type"})
    }
    }
    catch(err){
        return res.status(500).json({err:"Internal server error"})
    }
})

router.put("/:id",async(req,res)=>{
    try{
    const id=req.params.id;
    const updatedMenu=req.body;
    const response=await Menu.findByIdAndUpdate(id,updatedMenu,{
        new:true,
        runValidators:true
    })
    if(!response){
        return res.status(404).json({msg:"Menu item not found"})
    }
    return res.status(200).json(response);
    }
    catch(error){
        return res.status(500).json("Internal server error");
    }
})

router.delete("/:id",async(req,res)=>{
    try{
    const id=req.params.id;
    const response=await Menu.findByIdAndRemove(id);
    if(!response){
        return res.status(404).json({msg:"Menu item not found"})
    }
    return res.status(200).json(response);}
    catch(error){
        return res.status(500).json("Internal server error");
    }

})
module.exports=router;