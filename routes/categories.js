const express=require('express');
const router=express.Router();

const {
    createCategory,
    findAllCategories,
    findCategoryById,
    deleteCategoryById,
    updateCategory }=require('../controllers/categoryControllers')

const { protect } = require('../middleware/authMiddleware');

router.get('/',findAllCategories);
router.get('/:id',findCategoryById);
router.post('/', protect, createCategory);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);

module.exports=router;