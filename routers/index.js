const Router = require('express')
const router = new Router()
const reviewRouter = require('./reviewRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/review', reviewRouter)

module.exports = router