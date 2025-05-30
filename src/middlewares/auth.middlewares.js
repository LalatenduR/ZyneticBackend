import { apiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const authVerify=asynchandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken||req.headers["Authorization"]?.replace("Bearer ","");
        if(!token)
        {
            throw new apiError(401,"unauthorized");
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_JWT_SECRET);
        const user=await User.findById(decodedToken._id).select("-password -refreshToken"); 
        if(!user){
            throw new apiError(401,"Unauthorized");
        }
    
        req.user=user;
        next();
    } catch (error) {
        throw new apiError(401,error?.message || "Unauthorized");
    }

})