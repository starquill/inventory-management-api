const express=require('express');
const router=express.Router();

const {
    createCategory,
    findAllCategories,
    findCategoryById,
    deleteCategoryById,
    updateCategory }=require('../controllers/categoryControllers')

router.post('/',createCategory);
router.get('/',findAllCategories);
router.get('/:id',findCategoryById);
router.put('/:id',updateCategory)
router.delete('/:id',deleteCategoryById)

module.exports=router;