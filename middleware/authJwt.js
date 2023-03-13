const jwt = require("jsonwebtoken");
const { User } = require("../models/UserModel");

const verifyToken = (req,res,next) =>{
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
          message: "No token provided!"
        });
      }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
      console.log(err);
        if (err) {
            return res.status(401).send({
              message: err | "Unauthorized!"
            });
          }
          req.userId = decoded.id;
          next();
    }); 
}

module.exports = {verifyToken};