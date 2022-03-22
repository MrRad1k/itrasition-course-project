const ApiError = require('../error/ApiError')


class UserController {
    /*async reg(req, res) {

    }

    async login(req, res) {

    }*/

    async auth(req, res, next) {
        /*const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан Id'))
        }
        res.json(id)*/  
    }

    async getOne(req, res) {

    }
}

module.exports = new UserController()