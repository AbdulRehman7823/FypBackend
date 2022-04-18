const express = require("express");
const router = express.Router();
const Respondant = require("../../models/Respondant")

router.get("/", async (req, res) => {
  let respondant = await Respondant.find();
  if (respondant.length == 0) {
    res.status(404).send({ message: "no Respondant found" });
  } else {
    res.status(200).send(respondant);
  }
});

router.get("/:id", async (req, res) => {
  let respondant = await Respondant.findById(req.params.id);
  if (respondant) {
    res.status(200).send(respondant);
  } else {
    res.status(404).send({ message: "This respondant does not exist" });
  }
});

router.post("/", async (req, res) => {
  let respondant = await Respondant.findOne({ email: req.body.email });
  if (respondant) {
    return res.status(400).send({ message: "This respondant is already registered" });
  } else {
    respondant = new Respondant();
    respondant.name = req.body.name;
    respondant.email = req.body.email;
    respondant.password = req.body.password;
    respondant.img = req.body.img;
    respondant.requests = req.body.requests;
    await respondant.save();
    return res.send(respondant);
  }
});

module.exports = router;
