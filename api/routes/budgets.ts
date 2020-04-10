import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const router = express.Router()
import checkAuth from '../middleware/check-auth'
import checkUser from '../middleware/check-user'
import { 
    addBudget, 
    deleteCategoryForUser, 
    updateValueForCategory, 
    getBudgetsForUser 
} from '../controllers/budgets'

router.get('/:username', checkAuth, checkUser, getBudgetsForUser)
router.post('/:username/:category', checkAuth, checkUser, addBudget)
router.patch('/:username/:category', checkAuth, checkUser, updateValueForCategory)
router.delete('/:username/:category', checkAuth, checkUser, deleteCategoryForUser)

export default router