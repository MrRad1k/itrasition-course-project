const sequelize = require('../db')
const { DataTypes } = require('sequelize')


const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    photo: { type: DataTypes.STRING },
    googleId: { type: DataTypes.STRING },
    githubId: { type: DataTypes.STRING }
})

const Review = sequelize.define('review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titel: { type: DataTypes.STRING },
    text: { type: DataTypes.STRING },
    rateMe: { type: DataTypes.INTEGER },
})

const RatingUser = sequelize.define('rating_user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER },
})

const Group = sequelize.define('group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    group: { type: DataTypes.STRING },
})

const Image = sequelize.define('image', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img: { type: DataTypes.STRING },
})

const Tag = sequelize.define('tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tag: { type: DataTypes.STRING },
})

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    comment: { type: DataTypes.STRING }
})

const Like = sequelize.define('like', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})


User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(RatingUser)
RatingUser.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(Like)
Like.belongsTo(User)


Review.hasMany(RatingUser)
RatingUser.belongsTo(Review)

Review.hasMany(Like)
Like.belongsTo(Review)

Review.hasMany(Comment)
Comment.belongsTo(Review)

Review.hasMany(Tag)
Tag.belongsTo(Review)

Review.hasMany(Image)
Image.belongsTo(Review)


Group.hasMany(Review)
Review.belongsTo(Group)


module.exports = {
    User,
    Review,
    RatingUser,
    Group,
    Image,
    Tag,
    Comment,
    Like
}