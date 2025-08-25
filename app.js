//usar variables de entorno
require('dotenv').config();

const express = require('express');
const conexion = require('./config/config');
const userModel = require('./models/userModel');
const { model, Model } = require('mongoose');

//encriptar passwords
const bcrypt = require('bcrypt');



const app = express();

//variable para crear las rutas
const router = express.Router();

//para que pueda entender el formato json
app.use(express.json())

// indicando a express que use el router
app.use(router)

// endpoint principal
app.get('/', (req, res) => {
    res.send('Bienvenido a mi Api REST');
});

//Rutas

// Ruta POST para registar a un nuevo usuario
router.post("/register", async (req, res) => {
    try {
        const { cedula, email, password } = req.body;

        // Buscar si ya existe un usuario con la misma cédula o email
        const userByCedula = await userModel.findOne({ cedula });
        if (userByCedula) {
            return res.status(400).send(`ya existe un usuario con la cedula ${cedula}`);
        }
        const userByEmail = await userModel.findOne({ email });
        if (userByEmail) {
            return res.status(400).send(`ya existe un usuario con el email ${email}`);
        }

        // Creamos y guardamos el usuario usando async/await
        const user = new userModel({ cedula, email, password });
        await user.save();
        res.status(200).send('Usuario Registrado con exito!');
    } catch (err) {
        res.status(500).send('Error al Registrar al usuario');
    }
});

//Ruta para login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Buscar usuario por email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send('Usuario no encontrado');
        }

        // Comparar contraseña usando bcrypt
        const isMatch = await new Promise((resolve, reject) => {
            user.isCorrectPassword(password, (err, same) => {
                if (err) reject(err);
                else resolve(same);
            });
        });
        
        if (isMatch) {
            res.status(200).send('Inicio de sesión exitoso');
        } else {
            res.status(401).send('Contraseña incorrecta');
        }
    } catch (err) {
        res.status(500).send('Error al Autenticar al usuario');
    }
});

//conexion a la base de datos
conexion();

// Puerto donde se ejecuta app.js
app.listen(3000, () => {
    console.log("El servidor está en el puerto 3000")
})

