const express = require("express");
const router = express.Router();
const Usersch = require("../models/Users");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "iamvenkatasai";
const fetchuser = require("../middleware/fetchuser")

router.post(
   "/createuser",
   [
      body("name", "Enter valid Name").isLength({ min: 3 }),
      body("email", "Enter valid email").isEmail(),
      body("password", "Enter valid password").isLength({ min: 5 }),
   ],
   async (req, res) => {
      let success=false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      try {
         let user = await Usersch.findOne({ email: req.body.email });
         if (user) {
            
            return res
               .status(400)
               .json({success, error: "Sorry, a user with this email already exists" });
         }
         const salt = await bcrypt.genSalt(10);

         const secPass = await bcrypt.hash(req.body.password, salt);

         user = await Usersch.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
         });

         const data = {
            user: {
               id: user.id,
            },
         };

         const authtoken = jwt.sign(data, JWT_SECRET);
         success=true
         res.json({ success,authtoken });

         // console.log(user) 
      } catch (error) {
         success =false
         console.log(error);
         res.status(500).json({ success,error: "Some error occured" });
      }
   }
);

router.post(
   "/login",
   [
      body("email", "Enter valid email").isEmail(),
      body("password", "password cannot be blank").exists(),
   ],
   async (req, res) => {
      let success=false
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      try {
         let user = await Usersch.findOne({ email });
         if (!user) {
            return res.status(400).json({ error: "sorry user doesnot exsits" });
         }
         const passwordcompare = await bcrypt.compare(password, user.password);

         if (!passwordcompare) {
            success=false
            return res.status(400).json({ success,error: "sorry user doesnot exsits" });
         }
         //console.log({passwordcompare})
         const data = {
            user: {
               id: user.id,
            },
         };
         const authtoken = jwt.sign(data, JWT_SECRET);
         success=true
         res.json({success, authtoken });
      }
      catch (error) {
         success=false
         console.log(error);
         res.status(500).json({ error: "Internal server error occured" });
      }
   }
);



router.post("/getuser",fetchuser, 
   async (req, res) => {
      try {
         var userId = req.user.id
         const user = await Usersch.findById(userId).select("-password")
         res.send({user})
      } catch (error) {
         console.log(error);
         res.status(500).json({ error: "Internal server error occured" });
      }
   }
)


module.exports = router;
