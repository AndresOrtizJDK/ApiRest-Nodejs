const mongoose = require('mongoose');

// conexión a la base de datos NoSQL MongoDB
const conexion = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.token}@cluster0.vktcqgx.mongodb.net/${process.env.collection}`, 
            {});
        console.log('Conexión a la BD');
       
    } catch (error) {
        console.error('Error al conectar a la BD:', error);
    }
};

module.exports = conexion;