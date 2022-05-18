const jwt = require('jsonwebtoken');
const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
console.log(token);
    if(token==null) return res.sendStatus(401)
    jwt.verify(token,process.env.SECRET_TOKEN,(err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports = authToken;