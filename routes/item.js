const express=require('express')
const router=express.Router()

const { 
    createItem, 
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
 } = require('../controllers/itemControllers')

router.post('/',createItem);
router.get('/',getAllItems);
router.put('/:id',updateItem);
router.delete('/:id',deleteItem);
router.get('/:id',getItemById);

module.exports=router;