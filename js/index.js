window.onload = function () {
    obtenerUsuarios(); // Llama a la función para obtener y mostrar los datos al cargar la página
}

async function obtenerUsuarios() {
    try {
        // Llama a la API de Express
        const respuesta = await fetch('http://localhost:3000/usuarios');

        // Convierte la respuesta a formato JSON
        const usuarios = await respuesta.json();
        console.log(usuarios)


        new DataTable('#usuarios', {
            data: usuarios,
            columns: [
                { data: 'nombre' },
                { data: 'email' },
                { data: 'fechaNacimiento', render: function (data) {
                    const fecha = new Date(data);
                    return fecha.toLocaleDateString();
                }},
                {data: 'paisInfo.nombre'}, // Muestra el nombre del país desde el lookup
                { data: 'direccion',render:function(data){
                    return data.map(direccion => `${direccion.calle} N°${direccion.numero}${direccion.departamento !==''?', Depto/Of ' + direccion.departamento:''}`)
                }},
                { data: 'genero', render: function (data) {
                    return data === 'Masc' ? 'Masculino' : data === 'Fem' ? 'Femenino' : 'Otro';
                }}
            ]
        });
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
    }
}