window.onload = function () {
    cargarOpciones(); // Llama a la función para cargar las opciones del select al cargar la página

    document.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault();

        if (validarFormulario()) {
            const formData = new FormData(e.target);
            const datos = Object.fromEntries(formData.entries());

            const response = await fetch("http://localhost:3000/guardar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            })
                .then((res) => res.text())
                .then((data) => console.log(data))
                .catch((err) => console.error("Error:", err));
        };
    });
};

async function enviarFormulario() {
    if (validarFormulario()) {
            const formData = new FormData(e.target);
            const datos = Object.fromEntries(formData.entries());

            const response = await fetch("http://localhost:3000/guardar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            })
                .then((res) => res.text())
                .then((data) => console.log(data))
                .catch((err) => console.error("Error:", err));
        };
}

function validarFormulario() {
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const contrasena = document.getElementById("contrasena");
    const repetirContrasena = document.getElementById("repetirContrasena");

    if (nombre.value == '' || email.value == '' || contrasena.value == '' || repetirContrasena.value == '') {
        nombre.classList.add("is-invalid");
        email.classList.add("is-invalid");
        contrasena.classList.add("is-invalid");
        repetirContrasena.classList.add("is-invalid");
        alert("Por favor, complete todos los campos.");
        return false;
    }
    return true;
}

async function cargarOpciones() {
    try {
        const respuesta = await fetch('http://localhost:3000/paises');
        const datos = await respuesta.json();

        console.log(datos);

        const select = document.getElementById('selectNacionalidad');

        datos.forEach(item => {
            const opcion = document.createElement('option');
            opcion.value = item.iso2; // Valor interno
            opcion.textContent = item.nombre; // Texto visible para el usuario
            select.appendChild(opcion);
        });
    } catch (error) {
        console.error('Error cargando opciones:', error);
    }
}