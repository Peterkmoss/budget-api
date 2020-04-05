import express from 'express'
const router = express.Router()
import checkAuth from '../middleware/check-auth'
import checkUser from '../middleware/check-user'
import { 
    newEntry, 
    deleteCategoryForUser, 
    updateValueForCategory, 
    getBudgetsForUser 
} from '../controllers/budgets'

router.post('/', checkAuth, newEntry)

router.get('/:username', checkAuth, checkUser, getBudgetsForUser)

router.patch('/:username/:category', checkAuth, checkUser, updateValueForCategory)

router.delete('/:username/:category', checkAuth, checkUser, deleteCategoryForUser)

export default router