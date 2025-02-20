import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser= asyncHandler (async(req,res)=>{
    console.log("Register User Route Hit!"); // Add this log to verify the route is hit

    res.status(200).json({
        message:"ok"
    })
})

export {registerUser}