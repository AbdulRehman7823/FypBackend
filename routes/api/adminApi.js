const express = require("express");
const router = express.Router();
const Doctor = require("../../models/Doctor");
const Pharmacist = require("../../models/Pharmacist");
const Respondant = require("../../models/Respondant");

router.get("/doctors", async (req, res) => {
  try {
    let doctors = await Doctor.find();
    if (doctors.length > 0) {
      res.status(200).send(doctors);
    } else {
      res.status(400).send("There is no Doctor available");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/pharmacist", async (req, res) => {
  try {
    let pharmacist = await Pharmacist.find();
    if (pharmacist.length > 0) {
      res.status(200).send(pharmacist);
    } else {
      res.status(400).send("There is no pharmacist available");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/respondant", async (req, res) => {
  try {
    let respondant = await Respondant.find();
    if (respondant.length > 0) {
      res.status(200).send(respondant);
    } else {
      res.status(400).send("There is no respondant available");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/doctors/:id", async (req, res) => {
  try {
    let doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (doctor) {
      res.status(200).send({ message: "Doctor deleted successfully" });
    } else {
      res.status(400).send({ message: "Doctor is not available" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/pharmacist/:id", async (req, res) => {
    try {
      let pharmacist = await Pharmacist.findByIdAndDelete(req.params.id);
      if (pharmacist) {
        res.status(200).send({ message: "pharmacist deleted successfully" });
      } else {
        res.status(400).send({ message: "pharmacist is not available" });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  router.delete("/respondant/:id", async (req, res) => {
    try {
      let respondant = await Respondant.findByIdAndDelete(req.params.id);
      if (respondant) {
        res.status(200).send({ message: "respondant deleted successfully" });
      } else {
        res.status(400).send({ message: "respondant is not available" });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  module.exports = router;