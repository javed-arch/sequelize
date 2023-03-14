const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


 const auth = (req, res, next) => {
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token){
            const isTokenValid = jwt.verify(token, process.env.JWT);
            if(isTokenValid){
                req.userId = isTokenValid?.id;
                return next();
            }else{
                return res.sendStatus(401);
            }
        }else{
            return res.sendStatus(401);
        }
    }catch(error){
        res.status(500).json(error);
    }
}

module.exports = auth;