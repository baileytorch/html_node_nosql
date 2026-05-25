window.onload = function () {
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