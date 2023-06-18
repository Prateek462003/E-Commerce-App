const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) =>{
    const token = req.cookie.access_token;
    if(!token){
        res.status(401).json("You are not authenticated");
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user)=>{
        if(err){
            res.status(500).json("invalid Token");
        }
        req.user = user
        next();
    });
}

const verifyTokenAndAuthorization = (req, res, next) =>{
    verifyToken(req, res, next, ()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            res.send("Hello You are logged in ");
        }
        else{
            res.send(403).send("You are not authorised");
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) =>{
    verifyToken(req, res, next, ()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).send("You are not Authorised");
        }
    })
}


module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};