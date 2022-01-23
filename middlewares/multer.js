const multer = require('multer');
const jwt = require('jsonwebtoken');

const subirFile = ()=>{
    const storage = multer.diskStorage({
        destination: './uploads/usuarios',
        filename: function (req, file, cb) {

            const {uid}=jwt.verify(token,process.env.JWT_SECRET);
            req.uid=uid;     
            const nameFile = uid+'-'+file.originalname;     
            console.log(nameFile); 
            cb(null, nameFile)
        }
    })
    
    const upload = multer({ storage:storage }).array();
   
    return upload;
}
module.exports={subirFile};

