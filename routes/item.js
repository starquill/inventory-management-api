const express=require('express')
const router=express.Router()

const { 
    createItem, 
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
 } = require('../controllers/itemControllers')

 const { protect } = require('../middleware/authMiddleware');

router.get('/',getAllItems);
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);
router.get('/:id',getItemById);

module.exports=router;