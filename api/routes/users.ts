import express from 'express'
const router = express.Router()
import checkAuth from '../middleware/check-auth'
import checkUser from '../middleware/check-user'
import { 
    registerUser, 
    getUserInfo, 
    loginUser, 
    updatePassword, 
    deleteUser 
} from '../controllers/users'

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/:username', checkAuth, checkUser, getUserInfo)

router.patch('/:username', checkAuth, checkUser, updatePassword)

router.delete('/:username', checkAuth, checkUser, deleteUser)

export default router