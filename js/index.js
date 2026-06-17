window.onload = function () {
    obtenerUsuarios(); // Llama a la función para obtener y mostrar los datos al cargar la página
}

async function obtenerUsuarios() {
    try {
        // Llama a la API de Express
        const respuesta = await fetch('http://localhost:3000/usuarios');

        // Convierte la respuesta a formato JSON
        const usuarios = await respuesta.json();
        // Load countries to map ISO codes to country names
        let paisMap = {};
        try {
            const respPaises = await fetch('http://localhost:3000/paises');
            const paises = await respPaises.json();
            paises.forEach(p => {
                if (p.iso2) paisMap[p.iso2.toUpperCase()] = p.nombre;
            });
        } catch (err) {
            console.warn('No se pudo cargar la lista de países, mostrando códigos en su lugar.', err);
        }

        new DataTable('#usuarios', {
            data: usuarios,
            columns: [
                { data: 'nombre' },
                { data: 'email' },
                { data: 'fechaNacimiento', render: function (data) {
                    const fecha = new Date(data);
                    return fecha.toLocaleDateString();
                }},
                { data: 'nacionalidad', render: function (data) {
                    if (!data) return '';
                    const key = String(data).toUpperCase();
                    return paisMap[key] || data;
                }},
                { data: 'direccion' },
                { data: 'genero', render: function (data) {
                    return data === 'Masc' ? 'Masculino' : data === 'Fem' ? 'Femenino' : 'Otro';
                }}
            ]
        });
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
    }
}