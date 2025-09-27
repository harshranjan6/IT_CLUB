const jwt = require("jsonwebtoken");
const User = require("../models/user");


async function authMiddleware(req, res, next){
    // get token from headers
    // Expected format : "Bearer <token>"
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(400).json({message:"No token, authorization denied"})

    }

    const token = authHeader.split(" ")[1]; // get actual token after "Bearer"

    try{
        // 2. verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "yourSeceretKey" )

        // 3. Attach user data to request(so routes can access it)
        req.user = decoded

        // 4. Pass control to the next middleware/route
        next();
    }catch(err){
        if(err.name === "TokenExpiredError"){
            return res.status(401).json({msg:"Token expired, please login again"})
        }
        return res.status(401).json({msg: " Invalid token"})
    }
}
module.exports = authMiddleware;