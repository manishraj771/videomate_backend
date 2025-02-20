import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

/*
  - `express()` ek Express application instance create karta hai.
  - Ye `app` hamara main backend server hai jahan hum middleware aur routes define karte hain.
*/
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Requests ko allowed domains tak restrict karta hai (from .env)
    credentials: true, // Cookies aur authentication headers ko send karne ki permission deta hai
  })
);

/*
    CORS Kya Hai? 
  - CORS (Cross-Origin Resource Sharing) unauthorized websites ko apne backend tak access karne se rokta hai.
  - Example: Agar aapka frontend `example.com` par hai aur backend `api.example.com` par hai, toh CORS unhe baat karne ki permission deta hai.
  - `credentials: true` cookies aur tokens ko requests ke saath send karne ki permission deta hai (authentication ke liye important hai!).
*/

app.use(express.json({ limit: "16kb" }));
/*
    `express.json({ limit: "16kb" })`
  - Ye middleware Express ko requests mein JSON data ko parse karne ki capability deta hai.
  - `limit: "16kb"` ensure karta hai ki request bodies 16KB se zyada na ho (excessive memory usage ko rokta hai).
  - Example: Agar ek user `{ "name": "John" }` send kare, ye middleware ensure karta hai ki hum `req.body.name` access kar sakte hain.
*/

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
/*
     `express.urlencoded({ extended: true, limit: "16kb" })`
  - URL-encoded data ko parse karta hai (jaise form submissions `application/x-www-form-urlencoded`).
  - `extended: true` complex nested objects ko send karne ki permission deta hai.
  - Example: Agar ek form `name=John&age=25` send kare, ye ensure karta hai ki hum `req.body.name` aur `req.body.age` access kar sakte hain.
*/

app.use(express.static("public"));
/*
     `express.static("public")`
  - Static files (images, CSS, JavaScript) ko `public` folder se serve karta hai.
  - Example: Agar `public/logo.png` exist karta hai, toh aap ise `http://yourserver.com/logo.png` par access kar sakte hain.
*/

app.use(cookieParser());
/*
     `cookieParser()`
  - Express ko requests se cookies read karne ki capability deta hai.
  - Authentication ke liye useful hai (tokens ko headers ke bajaye cookies mein store karna).
  - Example: Agar ek user login kare, toh uska token ek cookie mein store ho sakta hai jaise `accessToken=xyz123`.
*/


//routes import
import userRouter from './routes/user.routes.js'


//roues declartaion
console.log("User router is being used");

app.use("/api/v1/users",userRouter);

export {app}