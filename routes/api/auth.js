const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send({ message: "This user already exists" });
    } else {
        user = new User(req.body);
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
    if (user.password !== req.body.password) {
      res.status(500).send({ message: "Password is incorrect" });
    } else {
      if(user.userType == 'patient'){
        return res.status(200).send({username: user.username,
                            email: user.email,
                            phone: user.phone,
                            city: user.city,
                            respondants: user.respondants,
                            doctors: user.doctors,
                            });
                        }
        else if(user.userType == 'doctor'){
            return res.status(200).send({username: user.username,
                                        email: user.email,
                                        phone: user.phone,
                                        city: user.city,
                                        specialization: user.specialization,
                                        doctorCustomers: user.doctorCustomers,
                                        });
        } else if(user.userType == 'respondant'){
            return res.status(200).send({username: user.username,
                email: user.email,
                phone: user.phone,
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
