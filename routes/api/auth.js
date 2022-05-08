const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send({ message: "This user already exists" });
    } else {
        user = new User(req.body);
        user.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString(),
        await user.save();
        res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send({ message: "Invalid information" + err });
  }
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {

 const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
  );
  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      res.status(500).send({ message: "Password is incorrect" });
    } else {
      if(user.userType == 'patient'){
        return res.status(200).send({username: user.username,
                            email: user.email,
                            userType:user.userType,
                            phone: user.phone,
                            city: user.city,
                            respondants: user.respondants,
                            doctors: user.doctors,
                            });
                        }
        else if(user.userType == 'doctor'){
            return res.status(200).send({username: user.username,
                                        email: user.email,
                                        userType:user.userType,
                                        phone: user.phone,
                                        city: user.city,
                                        specialization: user.specialization,
                                        doctorCustomers: user.doctorCustomers,
                                        });
        } else if(user.userType == 'respondant'){
            return res.status(200).send({username: user.username,
                email: user.email,
                phone: user.phone,
                userType:user.userType,
                city: user.city,
                requests: user.requests,
                });
        }       
    }
  } else {
    res.status(500).send({ message: "This user is not registered." });
  }
});

module.exports = router;
