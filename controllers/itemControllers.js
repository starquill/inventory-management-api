const Item=require('../models/Item')
const Category=require('../models/Category')

const createItem=async (req,res)=>{
    try{
        const { name,quantity,category:categoryId }=req.body;
        if(!name || !quantity || !categoryId)
            res.status(400).json({message:'Please provide name,quantity and categoryID'});
        const categoryExists= Category.findById(categoryId);
        if(!categoryExists)
            res.status(404).json({message:"category not found"});
        const item= new Item({
            name:name,
            quantity:quantity,
            category:categoryId
        })
        const savedItem=await item.save();
        res.status(201).json(savedItem);
    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

const getAllItems=async(req,res)=>{
    try{
        const item=await Item.find().populate('category');
        res.status(200).json(item);
    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

module.exports={
    createItem,
    getAllItems
}