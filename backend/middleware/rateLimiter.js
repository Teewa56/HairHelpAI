const rateLimiter = require('express-rate-limit')

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max:      100,
    message:  {message: "Too many request, please try again later"},
    headers:  true,
    standardHeaders: 'draft-7',
    legacyHeaders: false
})

module.exports = limiter