const jwt = require('jsonwebtoken');
require('dotenv').config();



const auth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        // console.log(token)
        if (!token) {
            return res.sendStatus(403);
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        console.log(verified)
        if(!verified) {
            return res.sendStatus(403);
        }
        req.id = verified.id
        next();
    } catch (error) {
        console.error(error); 
    }
}
module.exports = auth;