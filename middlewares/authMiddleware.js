const jwt = require ('jsonwebtoken');

const authentication = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).send({message: 'unauthorized'})
    }
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY)
    if (!decoded) {
        return res.status(401).send({message: 'unauthorized'})
    }
    req.user = decoded
    next()
}
module.exports = authentication
