const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFileds } = require('../middlewares/validate-fileds');
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

//Crear user
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es requerida').isLength({ min: 6 }),
    validateFileds
], createUser);

//Login user
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es requerida').isLength({ min: 6 }),
    validateFileds
], loginUser);

//Validar token
router.get('/renew', validateJWT, renewToken);



module.exports = router;
