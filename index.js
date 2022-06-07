const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./Db/config');
require('dotenv').config();

//Crear el server/app de express
const app = express();

//Conexion a la bd
dbConnection();

//Directorio publico
app.use(express.static('public'));

//CORS
app.use(cors());

//Lectura y parse del body
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Server en el puerto ${process.env.PORT}`);
});