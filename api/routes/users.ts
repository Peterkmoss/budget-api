import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get users'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Post users'
    })
})

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId
    res.status(200).json({
        message: 'You passed userId: ' + id
    })
})

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId
    res.status(200).json({
        message: 'Updated user: ' + id
    })
})

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId
    res.status(200).json({
        message: 'Deleted user: ' + id
    })
})

export default router