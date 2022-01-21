
require('dotenv').config();
const express = require('express');
const {dbConexion}=require('./db/config');
const cors = require('cors');


const app = express();
//dbconexion
dbConexion();
//configurar cors
app.use(cors());

//lectura y parseo body
app.use(express.json());

//rutas

app.use('/api/usuarios',require('./routes/usuarios.route'))




app.listen(process.env.PORT,()=>
    {
        console.log('Servidor corriendo en el puerto '+process.env.PORT);
    }

)


