const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario.model');
const { googleVerify } = require('../helpers/google-verify');




const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email o password no válido'
            });
        }

        //verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o password no válido'
            });
        }
        //Generar JWT

        const token = await generarWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSingIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email } = await googleVerify(googleToken);

        //verificar si existe
        const usuariodb = await Usuario.findOne({ email });
        let usuario;

        if (!usuariodb) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '',
                google: true
            })
        } else {
            usuario = usuariodb;
            usuario.google = true;
        }
        //guardar
        await usuario.save();
        //Generar JWT

        const token = await generarWT(usuario.id);

        res.json({
            ok: true,
            token,
            googleToken

        })
    } catch (error) {

        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no correcto'
        })
    }


}
const renewToken = async (req,res=response)=>{

    const uid = req.uid;

    const token = await generarWT(uid);
    const {nombre,email,google}  = await Usuario.findById(uid);
    

    res.json({
        ok:true,
        nombre,email,google,uid,
        token
    })
}

module.exports = { login, googleSingIn,renewToken }
