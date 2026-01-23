const jwt = require('jsonwebtoken');

exports.protect = (req,res,next) =>{
    token = req.headers.authorization.split(' ')[1];
   if(!token){
    res.status(401).json({msg: "Not Authorized"});
   }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded; // { id: userId }
    next();
   } catch (error) {
    res.send("Invalid token")
  }
};