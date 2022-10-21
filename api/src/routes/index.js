const { Router } = require("express");
const dogs = require("./dogs");
const temperaments = require("./temperaments");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/dogs", dogs);
router.use("/temperaments", temperaments);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
