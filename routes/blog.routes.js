const express = require("express")
const {articleModel} = require("../models/blog.model")
const articleRouter = express.Router()
const {tracker} = require("../middlewares/tracker")

//get routes for all the articles
articleRouter.get("/", tracker, async(req,res)=>{
    try {
        const article = await articleModel.find()
        res.status(200).send({article})
    } catch (error) {
        res.status(500).json({"msg":"Error while getting articles","err":error.message})
    }
})

//post routes for all the articles
articleRouter.post("/add",tracker, async(req,res)=>{
    try {
        const article = new articleModel(req.body)
        await article.save()
        res.status(200).json({"msg":"New Article have been added"})
    } catch (error) {
        res.status(500).json({"msg":"Error while posting an article","err":error.message})
    }
})

//get by id route for article
articleRouter.get("/:id", tracker, async(req,res)=>{
    try {
        const article = await articleModel.findById(req.params.id)
        res.status(200).send({article})
    } catch (error) {
        res.status(500).json({"msg":"Error while getting articles from an ID","err":error.message})
    }
})

//patch route for article
articleRouter.patch("/edit/:id", tracker, async(req,res)=>{
    try {
        const article = await articleModel.findByIdAndUpdate(req.params.id,req.body)
        if(!article){
            res.status(500).json({"msg":"Article not found"})
        }else{
            res.status(200).send({"msg":"Article updated successfully"})
        }
    } catch (error) {
        res.status(500).json({"msg":"Error while updating article","err":error.message})
    }
})

//DELETE route for article
articleRouter.delete("/rem/:id", tracker, async(req,res)=>{
    try {
        const article = await articleModel.findByIdAndDelete(req.params.id)
        if(!article){
            res.status(500).json({"msg":"Article not found"})
        }else{
            res.status(200).send({"msg":"Article Deleted successfully"})
        }
    } catch (error) {
        res.status(500).json({"msg":"Error while deleting an article","err":error.message})
    }
})


module.exports = {
    articleRouter
}