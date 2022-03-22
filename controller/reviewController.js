const uuid = require('uuid')
const path = require('path')
const { Review, Image, Tag, Comment, Like, RatingUser } = require('../models/models')
const ApiError = require('../error/ApiError')

class ReviewController {
    async create(req, res, next) {
        try {
            let { titel, text, rateMe, groupId, userId, image, tag, comment, like, ratingUser } = req.body

            const review = await Review.create({ titel, text, rateMe, groupId, userId })


            if (image) {
                const { img } = req.files
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))

                image = JSON.parse(image)
                image.forEach(i => {
                    Image.create({
                        img: i.img,
                        reviewId: review.id
                    })
                })
            }

            if (tag) {
                tag = JSON.parse(tag)
                tag.forEach(i => {
                    Tag.create({
                        tag: i.tag,
                        reviewId: review.id
                    })
                });
            }

            if (comment) {
                comment = JSON.parse(comment)
                comment.forEach(i => {
                    Comment.create({
                        comment: i.comment,
                        reviewId: review.id
                    })
                });
            }

            if (like) {
                like = JSON.parse(like)
                like.forEach(i => {
                    Like.create({
                        like: i.like,
                        reviewId: review.id
                    })
                });
            }

            if (ratingUser) {
                ratingUser = JSON.parse(ratingUser)
                ratingUser.forEach(i => {
                    RatingUser.create({
                        ratingUser: i.rate,
                        reviewId: review.id
                    })
                });
            }

            return res.json(review)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let { userId, groupId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let reviews;

        if (!userId && !groupId) {
            reviews = await Review.findAndCountAll({ limit, offset })
        }
        if (userId && !groupId) {
            reviews = await Review.findAndCountAll({ where: { userId, limit, offset } })
        }
        if (!userId && groupId) {
            reviews = await Review.findAndCountAll({ where: { groupId, limit, offset } })
        }
        if (userId && groupId) {
            reviews = await Review.findAndCountAll({ where: { userId, groupId, limit, offset } })
        }

        return res.json(reviews)
    }

    async getOne(req, res) {
        const { id } = req.params
        const review = await Review.findOne(
            {
                where: { id },
                include: [
                    { model: Image },
                    { model: Tag },
                    { model: Like },
                    { model: Comment },
                    { model: RatingUser },
                ]
            },
        )
        return res.json(review)
    }
}

module.exports = new ReviewController()