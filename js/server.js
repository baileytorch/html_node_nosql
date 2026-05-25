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

// Esquema y modelo de Mongoose
const usuario = new mongoose.Schema({
    nombre: String,
    email: String,
});

const Usuario = mongoose.model("Usuario", usuario);

// Rutas
// Ruta para recibir datos de un formulario
app.post("/guardar", async (req, res) => {
    console.log("Datos recibidos:", req.body);
    try {
        const { nombre, email } = req.body;
        const nuevoUsuario = new Usuario({ nombre, email, contrasena });
        // const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(200).json({ message: "Datos guardados correctamente" });
    } catch (error) {
        console.error("Error al guardar datos:", error);
        res.status(500).json({ message: "Error al guardar datos" });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});