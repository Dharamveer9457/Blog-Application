const mongoose = require("mongoose")
require('dotenv').config()

const connection = mongoose.connect(process.env.mongoURL)
.then(()=>console.log("Conneted to MongoDB Atlas"))
.catch((err)=>console.log(err))

module.exports = {
    connection
}