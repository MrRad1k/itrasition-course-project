const Router = require('express')
const router = new Router()
const userController = require('../controller/userController')

//router.post('/reg', userController.reg)
//router.post('/login', userController.login)
//router.get('/auth', userController.auth)
router.get('/:id', userController.getOne)

module.exports = router