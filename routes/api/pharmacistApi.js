const express = require("express");
const router = express.Router();
const Pharmacist = require("../../models/Pharmacist")

router.get("/", async (req, res) => {
  let pharmacist = await Pharmacist.find();
  if (pharmacist.length == 0) {
    res.status(404).send({ message: "no pharmacist found" });
  } else {
    res.status(200).send(pharmacist);
  }
});

router.get("/:id", async (req, res) => {
  let pharmacist = await Pharmacist.findById(req.params.id);
  if (pharmacist) {
    res.status(200).send(pharmacist);
  } else {
    res.status(404).send({ message: "This pharmacist does not exist" });
  }
});

router.post("/", async (req, res) => {
  let pharmacist = await Pharmacist.findOne({ email: req.body.email });
  if (pharmacist) {
    return res.status(400).send({ message: "This pharmacist is already registered" });
  } else {
    pharmacist = new User(pharmacist);
    await pharmacist.save();
    return res.send(pharmacist);
  }
});

module.exports = router;
