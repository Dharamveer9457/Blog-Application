const express= require("express")
const app = express()
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")
const {articleRouter} = require("./routes/blog.routes")
const {auth} = require("./middlewares/auth")
const {rateLimiter} = require("./middlewares/rateLimiter")
const port = process.argv[2]

app.use(express.json())


app.use(rateLimiter)
app.use("/users",userRouter)
app.use(auth)
app.use("/articles",articleRouter)

app.listen(port,async()=>{
    try {
        await connection
        console.log(`Connected to mongoDB at ${port}`)
    } catch (error) {
        console.log(error)
    }
})