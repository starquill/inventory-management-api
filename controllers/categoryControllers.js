const Category=require('../models/Category')

 const findCategoryById=async(req,res)=>{
    try{
    const {id}=req.params;
    const category=await Category.findById(id);
    if(!category)
        res.status(404).json({message:"Category not found"});
    res.status(200).json(category);
    } catch(error){
        res.send(500).json({message:"Server Error",error:error.message});
    }
 };
 const updateCategory=async(req,res)=>{
    try{
    const {id}=req.params;
    const {name}=req.body;
    const updatedCategory=await Category.findByIdAndUpdate(
        id,
        {name:name},
        {new:true}
    );
    if(!updatedCategory)
        res.status(404).json({message:"Category not found"});
    res.status(200).json(updateCategory);
    } catch(error){
        res.send(500).json({message:"Server Error",error:error.message});
    }
 };

 const deleteCategoryById=async(req,res)=>{
    try{
    const {id}=req.params;
    const category=await Category.findByIdAndDelete(id);
    if(!category)
        res.status(404).json({message:"Category not found"});
    res.status(200).json({message:"Category deleted successfully"});
    } catch(error){
        res.send(500).json({message:"Server Error",error:error.message});
    }
 };

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
    findAllCategories,
    findCategoryById,
    deleteCategoryById,
    updateCategory
  };