const Usuario = require('../models/usuario.model');
const {response}=require('express');
const bcrypt = require('bcryptjs');
const { generarWT } = require('../helpers/jwt');


const getUsuarios = async (req,res)=>{

    const usuarios = await Usuario.find();

    res.json({
        ok:true,
        usuarios
    })
}

const crearUsuario = async (req,res=response)=>{    

    const {email,password}=req.body;
    

    try {

        const existeEmail= await Usuario.findOne({email:email});

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El email ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();

        usuario.password=bcrypt.hashSync(password,salt);

        
        //guardar usuario
        await usuario.save();
        const token = await generarWT(usuario.id);
        res.json({
            ok:true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado, ..... revisar logs'
        })
    }


    


    
}

module.exports = {getUsuarios,crearUsuario}