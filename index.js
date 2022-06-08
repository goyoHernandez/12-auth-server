const express = require('express');
const cors = require('cors');
const path = require('path');
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

//Manejar todas las rutas
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server en el puerto ${process.env.PORT}`);
});