const express=require('express')
const router=express.Router()

const { createItem,getAllItems } = require('../controllers/itemControllers')

router.post('/',createItem);
router.get('/',getAllItems);

module.exports=router;