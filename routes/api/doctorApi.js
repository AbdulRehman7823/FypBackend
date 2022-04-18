const express = require("express");
const router = express.Router();
const Doctor = require("../../models/Doctor")

router.get("/", async (req, res) => {
  
  let doctor = await Doctor.find();
  if (doctor.length == 0) {
    res.status(404).send({ message: "no doctor found" });
  } else {
    res.status(200).send(doctor);
  }
});

router.get("/:id", async (req, res) => {
  let doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    res.status(200).send(doctor);
  } else {
    res.status(404).send({ message: "This doctor does not exist" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  let doctor = await Doctor.findOne({ email: req.body.email });
  if (doctor) {
    return res.status(400).send({ message: "This doctor is already registered" });
  } else {
    doctor = new Doctor();
    doctor.email = req.body.email;
    doctor.name = req.body.name;
    doctor.password = req.body.password;
    doctor.img = req.body.img;
    await doctor.save();
    return res.send(doctor);
  }
});

module.exports = router;
