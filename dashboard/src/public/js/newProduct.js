const baseUrl = "http://localhost:3000/api";

let qualitySelect = document.getElementById("quality-select");
let textDescription = document.getElementById("text-desc-label");
let numberDescription = document.getElementById("number-desc-label");
let qualityValue1 = document.getElementById("qualityValue1");
let qualityValue2 = document.getElementById("qualityValue2");

let productTypeSelect = document.getElementById("product-type-select");
productTypeSelect.addEventListener("change", () => {
    if(productTypeSelect.value === "Camiseta") {

        textDescription.textContent = "Nombre Estampa";
        numberDescription.textContent = "Nro. Camiseta Estampa";
        qualityValue1.textContent = "Jugador"; qualityValue1.value = "Jugador";
        qualityValue2.textContent = "Hincha"; qualityValue2.value = "Hincha";

    } else if (productTypeSelect.value === "Botines") {

        textDescription.textContent = "Modelo";
        numberDescription.textContent = "Talle";
        qualityValue1.textContent = "Césped"; qualityValue1.value = "Césped";
        qualityValue2.textContent = "Sintético"; qualityValue1.value = "Sintético";
    }
});

let newProduct_form = document.getElementById("new-product-form");          /*  Flujo Administrador | 8. El administrador completa el formulario. El administrador carga una imagen para el producto. */

newProduct_form.addEventListener("submit", async (event) => {               /*  Flujo Administrador | 9. El administrador presiona el botón agregar. */

    event.preventDefault();

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());

    if(!data["product-type"] || !data["text-desc"] || !data["number-desc"] || !data["quality"] || !data["price"] || !data["image"]) {
        alert("Todos los campos son obligatorios!");
        return;
    }

    try {

        let response = await fetch(`${baseUrl}/products`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });

        if(response.ok) {
            console.log(response);

            let result = await response.json();
            console.log(result.message);
            alert(result.message);

            window.location.href = `http://localhost:3000/dashboard`;       /*  Flujo Administrador |  10. Se redirige a la pantalla de dashboard. Se muestra el listado de productos, incluyendo el producto agregado. */

        } else {

            let error = await response.json();
            console.log("Error: ", error.message);
        }

    } catch(error) {

        console.log("Error al enviar los datos. ", error);
        alert("Error al enviar la solicitud");

    }

});