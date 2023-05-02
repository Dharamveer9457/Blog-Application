//tracker middleware

const fs = require("fs")

function tracker(req,res,next){
    const {ip, method, url} = req
    const timeStamp = new Date()

    let log = `${ip} ${method} ${url} ${timeStamp}.\n`

    fs.appendFile("tracker.txt",log, (err)=>{
        if(err)
        console.log(err)
    })
    next()
}

module.exports = {tracker}