const Router = require('express')
const router = new Router()
const reviewControlller = require('../controller/reviewController')

router.post('/', reviewControlller.create)
router.get('/', reviewControlller.getAll)
router.get('/:id', reviewControlller.getOne)

module.exports = router