const Category=require('../models/Category')

const createCategory=async (req,res)=>{
    try{
        const { name }=req.body;
        if(!name){
            return res.status(400).json({message:'Please provide a category name'});
        }
        const category=new Category({
            name: name
        });
        const savedCategory=await category.save()
        res.status(201).json(savedCategory);

    }catch(error){
        res.status(500).json({message:'Server Error',error:error.message});
    }
}
const findAllCategories=async(req,res)=>{
    try{
        const categories=await Category.find();
        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({message:'Sever Error'});
    }

}
module.exports = {
    createCategory,
    findAllCategories
  };