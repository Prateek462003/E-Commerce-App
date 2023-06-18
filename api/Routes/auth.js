const router = require("express").Router();
const User = require("../Models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// REGISTER
router.post("/register", async(req, res)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User(
        {
            username:req.body.username,
            email:req.body.email,
            password:hash
        }
    );
    try{
        const savedUser = await newUser.save();
        res.status(200).send(savedUser);
    }catch(err){
        res.status(500).json(err);
    }

});

// LOGIN
router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne(
            {
                username:req.body.username
            }
        );  
        !user && res.status(401).json("Wrong Username");
        
        const requiredPassword = user.password;
        const inputPassword = req.body.password;
        if(bcrypt.compareSync(inputPassword, requiredPassword)){
            const accessToken = jwt.sign(
                {
                id:user._id,
                isAdmin:user.isAdmin
                },
                process.env.JWT_KEY,
                {expiresIn:"3d"}
            );
            const {password, ...others} = user._doc;
            res.cookie("access_token", accessToken,{
                httpOnly:true
            }).status(200).json(others);
            // res.status(201).json({...others, accessToken});
        }else{
            res.status(401).json("Wrong Password");
        }
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;