
require('dotenv').config();
const express = require('express');
const {dbConexion}=require('./db/config');
const cors = require('cors');


const app = express();
//dbconexion
dbConexion();
//configurar cors
app.use(cors());
//rutas

app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg:'Hola mundo'
    })
});


app.listen(process.env.PORT,()=>
    {
        console.log('Servidor corriendo en el puerto '+process.env.PORT);
    }

)


