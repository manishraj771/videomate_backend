import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" // ki main mere server user ka browser hai nn uska cookies acces kar paaun aur uski cookies set kar paaun 


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true},{limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


export {app}