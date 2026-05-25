window.onload = function () {
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

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
    });
}