const mongoose = require('mongoose');

// Definir el esquema para "Post" 
const userModel = new mongoose.Schema({
    cedula: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

// Exportar el modelo para poder usarlo en otros archivos del programa
const ModelUser = mongoose.model('user', userModel); 
 module.exports = ModelUser