const mongoose = require('mongoose');


const dbConexion = async ()=>{
    
    try {
        await mongoose.connect(process.env.DB_CNN,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion a la BD, ver logs');
    }
    
}


module.exports={
    dbConexion
}