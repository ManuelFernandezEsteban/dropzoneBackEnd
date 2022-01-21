const {Router}=require('express');
const {check}=require('express-validator');
const {getUsuarios, crearUsuario}=require('../controllers/usuarios.controller');
const{validarCampos}=require('../middlewares/validar-campos');
/*
Ruta:/api/usuarios

*/

const router = Router();


router.get('/',getUsuarios);

router.post('/', 
    [ 
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        validarCampos,
    ] ,
    crearUsuario
);



module.exports=router;