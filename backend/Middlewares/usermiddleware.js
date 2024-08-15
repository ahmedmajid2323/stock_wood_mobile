const jwt = require('jsonwebtoken')
const Admin = require('../models/admins.model')

const userAuth = async (req , res, next) =>{

    const token = req.header('Authorization');
    /* const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token
    axios.get('https://your-api-endpoint.com/endpoint', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }) */
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN_MOBILE);
        req.userId = decoded.userId;
        next() ;
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }

}

module.exports = userAuth;