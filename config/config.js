const mongoose = require('mongoose');

// conexión a la base de datos NoSQL MongoDB
const conexion = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.TOKEN}@cluster0.vktcqgx.mongodb.net/${process.env.COLLECTION}`, 
            {});
        console.log('Conexión a la BD');
       
    } catch (error) {
        console.error('Error al conectar a la BD:', error);
    }
};

module.exports = conexion;