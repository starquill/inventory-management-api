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

const getItemById=async (req,res)=>{
    try{
        const { id }=req.params;
        const item=await Item.findById(id).populate('category');
        if(!item)
            res.status(404).json({message:'Item not found'})
        res.status(200).json(item);
    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

const updateItem=async (req,res)=>{
    try{
        const { id }=req.params;
        const {name,quantity,category:categoryID}=req.body;
        const updatedFields={};
        if(name) updatedFields.name=name;
        if(quantity) updatedFields.quantity=quantity;
        if(categoryID){
            const categoryExists=await Category.findById(categoryID);
            if(!categoryExists)
                return res.status(404).json({message:'New category not found'});
            updatedFields.category=categoryID;
        }
        const updatedItem=await Item.findByIdAndUpdate(
            id,
            updatedFields,
            {new:true}
        )
        if(!updateItem)
            return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(updatedItem);
    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message})
    }
}

const deleteItem=async (req, res) => {
    try {
      const { id }=req.params;
      const deletedItem=await Item.findByIdAndDelete(id);
      if (!deletedItem){
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };

module.exports={
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
}