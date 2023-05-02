//rateLimiter Middleware

const rateLimit = require('express-rate-limit')


const rateLimiter = rateLimit({
	windowMs: 60 * 1000, 
	max: 5, 
	message:"Max Request Limit Has Been Exceeded"
})

module.exports = {rateLimiter}