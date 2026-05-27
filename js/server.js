// import express from 'express';

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/test", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log("Conexión Exitosa a MongoDB"))
    .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Esquemas y modelos de Mongoose
const usuario = new mongoose.Schema({
    nombre: String,
    email: String,
    contrasena: String,
});

const Usuario = mongoose.model("Usuario", usuario, 'usuarios');

const pais = new mongoose.Schema({
    nombre: String,
    iso2: String,
    iso3: String,
    nacionalidad: String,
});
const Pais = mongoose.model("Pais", pais, 'paises');

// Rutas
// Ruta para recibir datos de un formulario
app.post("/guardar", async (req, res) => {
    console.log("Datos recibidos:", req.body);
    try {
        const { nombre, email, contrasena } = req.body;
        const nuevoUsuario = new Usuario({ nombre, email, contrasena });

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
        const usuarios = await Usuario.find(); // Lee todos los documentos
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

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});