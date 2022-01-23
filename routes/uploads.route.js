/*
ruta:api/upload
*/

const {Router} = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload } = require('../controllers/upload.controller');

const {validarJWT} = require('../middlewares/validar-JWT');


const router = Router();
router.use(expressFileUpload());



router.post('/:id',validarJWT,fileUpload);


module.exports = router;