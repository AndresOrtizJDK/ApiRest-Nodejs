//usar variables de entorno
require('dotenv').config();

const express = require('express');
const conexion = require('./config/config');
const ModelUser = require('./models/userModel');
const { model } = require('mongoose');


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

// Ruta POST para crear un nuevo usuario
router.post("/", async (req, res) => {
    // Obtenemos el cuerpo de la solicitud (los datos enviados por el cliente)
    const body = req.body;
    
    const { cedula, email } = req.body;
    // Buscar si ya existe un usuario con la misma cédula o email
    const userByCedula = await ModelUser.findOne({ cedula });
    if (userByCedula) {
        return res.status(400).send(`ya existe un usuario con la cedula ${cedula}`);
    }
    const userByEmail = await ModelUser.findOne({ email });
    if (userByEmail) {
        return res.status(400).send(`ya existe un usuario con el email ${email}`);
    }
    const respuesta = await ModelUser.create(body);
    // Enviamos la respuesta al cliente con el usuario creado
    res.send(respuesta);
});

router.post('/login', async (req, res) => {
    //guardamos el email y la password y dichas variables.
    const { email, password } = req.body;

    //buscamos al usuario por su email para ver si existe.
    const user = await ModelUser.findOne({ email });

    if (!user) {
        // si no existe, mandamos un mensaje de error
        return res.status(401).send('Usuario no encontrado');
    }
    if (user.password !== password) {
        //si existe pero sus credenciales no coinciden, error.
        return res.status(401).send('Contraseña incorrecta');
    }

    // si no entra en ninguna condicion anterior, es porque fue exitoso su inicio de sesion
    res.status(200).send('Inicio de sesión exitoso');
});

//conexion a la base de datos
conexion();

// Puerto donde se ejecuta app.js
app.listen(3000, () => {
    console.log("El servidor está en el puerto 3000")
})

