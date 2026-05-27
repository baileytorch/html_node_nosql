window.onload = function () {
    obtenerUsuarios(); // Llama a la función para obtener y mostrar los datos al cargar la página
}

async function obtenerUsuarios() {
    try {
        // Llama a la API de Express
        const respuesta = await fetch('http://localhost:3000/usuarios');

        // Convierte la respuesta a formato JSON
        const usuarios = await respuesta.json();

        new DataTable('#usuarios', {
            data: usuarios,
            columns: [
                { data: 'nombre' },
                { data: 'email' }
            ]
        });
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
    }
}