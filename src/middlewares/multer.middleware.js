import multer from "multer";

/*
  - Multer ek middleware hai jo Node.js mein file uploads ko handle karne ke liye use hota hai.
  - Yahan, hum ise configure kar rahe hain taaki files temporarily server par store ho sake.
*/

const storage = multer.diskStorage({
  /*
       `destination`: Upload ki gayi files ko kahan store karna hai
      - Ye function `req`, `file`, aur ek callback `cb` leta hai.
      - `cb(null, "./public/temp")` Multer ko batata hai ki files ko "public/temp" directory mein save kare.
    */
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  /*
        `filename`: Upload ki gayi file ka naam kya rakna hai
      - Ye function uploaded file ke liye naam generate karta hai.
      - `file.originalname` original file ka naam rakhta hai, use rename nahi karta.
    */
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/*
     Multer Upload Ko Set Karna
    - `multer({ storage })` Multer ko humare custom storage options ke saath initialize karta hai.
    - Baad mein hum `upload.single("fileFieldName")` ko apne routes mein use kar sakte hain single-file uploads ko handle karne ke liye.
  */
export const upload = multer({
  storage,
});

/*
 Multer Storage System - Notes: 

   `multer.diskStorage()` ko default storage ki jagah kyun use karein?
     - Default storage files ko memory (RAM) mein save karta hai, jo temporary hota hai.
     - Disk storage files ko ek specific directory mein rakhta hai, jisse wo zyada der tak persist karti hain.

   `file.originalname` kyun use karein?
     - Ye original filename rakhta hai, jisse users ke liye file recognizable rahti hai.
     - Agar unique names chahiye, toh filename ke saath `Date.now()` append kar sakte hain.
*/