const mongoose = require("mongoose")

const articleSchema = mongoose.Schema({
    title:({type:String,required:true}),
    body:({type:String,required:true}),
    user:({type:String,required:true}),
    userID:({type:String,required:true}),
    category:({type:String,required:true}),
    live:({type:Boolean})
},{
    versionKey : false
})

const articleModel = mongoose.model("articles",articleSchema)

module.exports={
    articleModel
}