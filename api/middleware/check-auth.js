const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
 try{
   const token = req.headers.authorization.split(" ")[1];
   console.log(token,"token")
   const verify = jwt.verify(token,"This is dummy text");
   console.log(verify)
   if(verify.userType == 'admin'){
       next();
   }else{
     return res.status(401).json({
        message:"Not admin"
     })
   }
 }catch(error){
   return res.status(401).json({
    message: 'Inavlid token'
   })
 }
}