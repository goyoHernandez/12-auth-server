const { mongoose } = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true
        });
        console.log('Connection success');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion de base de datos');
    }
}

module.exports = {
    dbConnection
}