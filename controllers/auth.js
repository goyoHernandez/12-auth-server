const { response } = require("express");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    const { email, name, password } = req.body;

    try {

        //verificar email duplicado
        const user = await User.findOne({ email });

        console.log(user);

        if (user)
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe en bd'
            });

        //Crear usuario con el modelo
        const userDB = new User(req.body);

        //Encriptar contraseña

        const salt = bcrypt.genSaltSync(10);

        userDB.password = bcrypt.hashSync(password, salt);

        //Generar JWT
        const token = await generateJWT(userDB.id, name);

        //Crear usuario en bd

        await userDB.save();

        //Generar respuesta exitosa

        return res.status(201).json({
            ok: true,
            uid: userDB.id,
            name,
            token,
            email
        });

    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el admin de la appp'
        });
    }
}

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });

        if (!userDB)
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });

        //Verificar contraseña

        const validPssword = bcrypt.compareSync(password, userDB.password);

        if (!validPssword)
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });

        //Generar JWT
        const token = await generateJWT(userDB.id, userDB.name);

        //Respuesta correcta
        return res.json({
            ok: true,
            uid: userDB.id,
            name: userDB.name,
            token,
            email
        });


    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el admin de la appp'
        });
    }
}

const renewToken = async (req, res = response) => {
    const { uid } = req;

    //Obtener el email de la bd
    const dbUser = await User.findById(uid);

    //Generar JWT
    const token = await generateJWT(uid, dbUser.name);

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        token,
        email: dbUser.email
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}