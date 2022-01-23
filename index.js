
require('dotenv').config();
const express = require('express');
const {dbConexion}=require('./db/config');
const cors = require('cors');



const app = express();
//dbconexion
dbConexion();

//directorio public

app.use(express.static('public'));



//configurar cors
app.use(cors());

//lectura y parseo body
app.use(express.json());

//rutas
//https://documenter.getpostman.com/view/11565815/UVXqEsNc
app.use('/api/usuarios',require('./routes/usuarios.route'));

app.use('/api/login',require('./routes/auth.route'));
app.use('/api/upload',require('./routes/uploads.route'));


app.listen(process.env.PORT,()=>
    {
        console.log('Servidor corriendo en el puerto '+process.env.PORT);
    }

)


