const { User } = require("../models/UserModel");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = (req,res) => {
     //Validate request
  if (!req.body.uname) {
    res.status(400).send({ message: "Content can not be empty" });
  }

  const user = {
    fname: req.body.fname,
    lname:req.body.lname,
    uname:req.body.uname,
    email: req.body.email,
    mobile:req.body.mobile,
    password:req.body.password,
    role:req.body.role
  }

  User.create(user).then(data=>{
    res.send({ message: "User was registered successfully!", })}).catch(err=>{
        res.status(500).send({
            message:err.message || 'Some error occured while creating user'
        })
    
  })
}

exports.signin = (req,res)=>{

        User.findOne({
            where:{
                uname:req.body.uname
            }
        }).then(async(user)=>{
            if(!user)
            {
               return res.status(404).send({message:"User not found!"})
            }
            console.log(user);
            const responseResult = await  bcrypt.compare(req.body.password,user.password).then(result=>{
                return result
             })
             if(!responseResult)
             {
                return res.status(401).send({message:"Incorrect pasword"});
             }
             var token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 60 // 1 minutes
              });
    
              res.status(200).send({
                id: user.id,
                username: user.uname,
                email: user.email,
                accessToken: token
              });
        });
        // var IspasswordValid = bcrypt.compare(req.body.password,user.password)
         
    
}