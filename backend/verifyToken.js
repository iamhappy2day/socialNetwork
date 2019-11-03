const jwt = require('jsonwebtoken')
//we can add this middleware function to any route we want to make it private(protected)
// we don't want them to access it without having this token
//we are gonna add this function before every private route to check if this token is avalible

module.exports = function (req, res) {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied')
    // But if we have a token we can verify it

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token')
    }
}