const jwt = require('jsonwebtoken');
require('dotenv').config();
const tokenSecret = process.env.TOKEN_SECRET;

const authMiddleware = (req, res, next) => {
    try {
        const publicPaths = [ '/signin', '/signup' ];
        const isPulbic = publicPaths.some(publicPath => req.path === publicPath);
        if(isPulbic) return next();
        const token = req.header('Authorization').split(' ')[1];
        if(!token) return res.status(401).json({message: 'Invalid Token'});
        const decoded = jwt.verify(tokenSecret, token);
        if(decoded){
            req.header('UserId') = decoded.id;
            next();
        }else{
            return res.status(401).json({message: 'Invalid Token'});
        }
    } catch (error) {
        console.log('Auth middle ware error : ', error);
        res.status(500).json({message: error.message})   
    }
}

module.exports = authMiddleware;