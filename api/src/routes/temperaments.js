const { Router } = require("express");
const router = Router();
const { Temper } = require("./../db");

router.get("/", async (req, res) => {
  //La api no tiene un llamado para todos los temperamentos, asi que tengo que sacar los temperamentos del llamado de las razas y filtrarlos para que no se repitan

  try {
    const temperaments = await Temper.findAll();
    res.status(200).send(temperaments);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
