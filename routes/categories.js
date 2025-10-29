const express=require('express');
const router=express.Router();

const { createCategory,findAllCategories }=require('../controllers/categoryControllers')

router.post('/',createCategory);
router.get('/',findAllCategories);

module.exports=router;