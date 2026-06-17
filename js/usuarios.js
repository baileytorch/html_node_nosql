use("test");

// Función para generar SHA-256 utilizando CryptoJS (mongosh moderno)
function generarHash(texto) {
    return require('crypto')
        .createHash('sha256')
        .update(texto)
        .digest('hex');
}

const nacionalidades = [
    "CL", "AR", "PE", "CO", "MX",
    "BR", "UY", "VE", "EC", "BO"
];

const generos = ["Masc", "Fem", "Otro"];

const usuarios = [];

for (let i = 1; i <= 50; i++) {
    const nombre = `Usuario ${i}`;
    const email = `usuario${i}@correo.com`;
    
    const anio = 1980 + Math.floor(Math.random() * 25);
    const mes = 1 + Math.floor(Math.random() * 12);
    const dia = 1 + Math.floor(Math.random() * 28);

    usuarios.push({
        nombre: nombre,
        email: email,
        fechaNacimiento: new Date(anio, mes - 1, dia),
        nacionalidad: nacionalidades[Math.floor(Math.random() * nacionalidades.length)],
        direccion: `Calle ${i} #${100 + i}, Ciudad ${i}`,
        genero: generos[Math.floor(Math.random() * generos.length)],
        contrasena: generarHash(`Password${i}@2025`),
        foto: `usuario${i}.jpg`
    });
}

db.usuarios.insertMany(usuarios);

print(`Se insertaron ${usuarios.length} usuarios correctamente.`);