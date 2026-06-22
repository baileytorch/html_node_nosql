const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.URL).then(() => console.log("Conexión Exitosa a MongoDB"))
    .catch((err) => console.error("Error al conectar a MongoDB:", err));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

const address = new mongoose.Schema({
    comuna: Number,
    calle: String,
    numero: String,
    departamento: String
});

const comuna = new mongoose.Schema({
    C_REGION: Number,
    COMUNA_INE: Number,
    N_COMUNA: String,
});
const Comuna = mongoose.model("Comuna", comuna, 'comunas');

const pais = new mongoose.Schema({
    nombre: String,
    iso_2: String,
    nacionalidad: String,
});
const Pais = mongoose.model("Pais", pais, 'paises');

// Esquemas y modelos de Mongoose
const usuario = new mongoose.Schema({
    nombre: String,
    email: String,
    fechaNacimiento: Date,
    nacionalidad: String,
    direccion: [address],
    genero: String,
    contrasena: String,
    foto: String,
    fecha: { type: Date, default: Date.now }
});
const Usuario = mongoose.model("Usuario", usuario, 'usuarios');

// Rutas
// Ruta para recibir datos de un formulario
app.post("/guardar", async (req, res) => {
    console.log("Datos recibidos:", req.body);
    try {
        const { nombre, email, fechaNacimiento, nacionalidad, direccion, genero, contrasena, foto } = req.body;
        // Encriptamos la contraseña antes de guardarla
        const contrasenaEncriptada = bcrypt.hashSync(contrasena, 10);
        const nuevoUsuario = new Usuario({ nombre, email, fechaNacimiento, nacionalidad, direccion, genero, contrasena: contrasenaEncriptada, foto });

        await nuevoUsuario.save();
        res.status(200).json({ message: "Datos guardados correctamente" });
    } catch (error) {
        console.error("Error al guardar datos:", error);
        res.status(500).json({ message: "Error al guardar datos" });
    }
});

// Ruta para leer datos usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.aggregate([{
            $lookup: {
                from: 'paises', // Nombre de la colección de países
                localField: 'nacionalidad', // Campo en usuarios
                foreignField: 'iso_2', // Campo en paises
                as: 'paisInfo' // Nombre del campo donde se almacenarán los datos
            }
        }, {
            $unwind: {
                path: '$paisInfo',
                preserveNullAndEmptyArrays: true
            }
        }]); // Lee todos los documentos
        res.json(usuarios); // Envía los datos en formato JSON
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los datos' });
    }
});

// Ruta para leer datos paises
app.get('/paises', async (req, res) => {
    try {
        const paises = await Pais.find();
        res.json(paises);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener datos' });
    }
});

// Ruta para leer datos comunas
app.get('/comunas', async (req, res) => {
    try {
        const comunas = await Comuna.find();
        res.json(comunas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener datos' });
    }
});