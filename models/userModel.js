const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userModel.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, 8, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        })
    } else {
        next();
    }
}
);

userModel.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    })
}

// Exportar el modelo para poder usarlo en otros archivos del programa
module.exports = mongoose.model('user', userModel);