const { Router } = require("express");
const { allDogs, createDog } = require("../controllers/dogs");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const razas = await allDogs();

    if (!razas) throw new Error("Fallo en la llamada a TheDogApi");

    res.status(200).send(razas);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, height, weight } = req.body;
    if (!name || !height || !weight) throw "Falta informacion de la raza";

    const newRace = await createDog(req.body);

    res.status(201).send(newRace);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
