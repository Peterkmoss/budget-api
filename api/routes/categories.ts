import express from 'express'
const router = express.Router()
import { 
    getAllCategories, 
    addCategory, 
    getCategory, 
    updateCategory, 
    deleteCategory 
} from '../controllers/categories'

router.get('/', getAllCategories)
router.get('/:category', getCategory)

router.post('/', addCategory)

router.patch('/:category', updateCategory)

router.delete('/:category', deleteCategory)

export default router