require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
//const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routers/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const cookieSession = require('cookie-session')
const passport = require('passport')
const passportSetup = require('./passport')
const authRouter = require("./routers/auth")


const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))


app.use(cookieSession({
    name: "session",
    keys: ["key"],
    maxAge: 24 * 60 * 60 * 100
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}))

app.use('/api', router)
app.use("/auth", authRouter)


app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
