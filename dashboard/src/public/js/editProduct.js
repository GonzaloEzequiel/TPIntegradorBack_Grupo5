const baseUrl = "http://localhost:3000/api";

let get_product_form = document.getElementById("get-product-form");
let edit_product_container = document.getElementById("edit-product-container");
let product_list = document.getElementById("product-list");

get_product_form.addEventListener("submit", async (event) => {

    event.preventDefault();
    
    edit_product_container.removeAttribute("class", "form-container");
    edit_product_container.innerHTML = ``;

    try {

        product_list.innerHTML = "<p>Cargando producto...</p>";

        let formData = new FormData(event.target); 
        let data = Object.fromEntries(formData.entries());

        let idProd = data["product-id"].trim();

        if(!idProd)
            throw new Error(`Error en el envio de datos del formulario.`);

        let response = await fetch(`${baseUrl}/products/${idProd}`);

        console.log(response);
        
        if(!response.ok)
            throw new Error(`Error ${response.status}: ${response.statusText}`);

        let datos = await response.json();

        console.log(datos);

        if(!datos.payload || datos.payload.length === 0)
            throw new Error("No se encontro el producto solicitado.");
        
        let producto = datos.payload[0];

        let HTMLProducto = `
            <li class="product-item">
                <img src="${producto.image}" alt="${producto.nombre}" class="product-img">
                <p>Id: ${producto.id} / ${producto.product_type} ${producto.desc_text} N°${producto.desc_number} / <strong>Precio: $${producto.price}</strong></p>
                <input type="button" class="form-button form-component" id="edit-product-btn" value="Actualizar Producto">
            </li>
        `;

        product_list.innerHTML = HTMLProducto;

        let editProduct_btn = document.getElementById("edit-product-btn");
        editProduct_btn.addEventListener("click", (event) => {
            formularioPutProducto(event, producto);
        });

        

    } catch (error) {

        console.error("Error al obtener el producto: ", error);
        product_list.innerHTML = `<p>${error.message}</p>`

    }

});

/**
 *  Crea el formulario de modificación una vez filtrado el producto a editar
 */
function formularioPutProducto(event, product) {
    event.stopPropagation();
    console.log(product);

    let auxStringSelect1; 
    let auxStringSelect2;
    if(product.product_type === "Camiseta") {
        auxStringSelect1 = `
            <option value="Camiseta" selected>Camiseta</option>
            <option value="Botines">Botines</option>
        `;
        
        if(product.quality === "Jugador") {
            auxStringSelect2 = `
                <option id="qualityValue1" value="Jugador" selected>Jugador</option>
                <option id="qualityValue2" value="Hincha">Hincha</option>
            `;
        } else {
            auxStringSelect2 = `
                <option id="qualityValue1" value="Jugador">Jugador</option>
                <option id="qualityValue2" value="Hincha" selected>Hincha</option>
            `;
        }

    } else {
        auxStringSelect1 = `
            <option value="Camiseta">Camiseta</option>
            <option value="Botines" selected>Botines</option>
        `;

        if(product.quality === "Césped") {
            auxStringSelect2 = `
                <option id="qualityValue1" value="Césped" selected>Césped</option>
                <option id="qualityValue2" value="Sintético">Sintético</option>
            `;                    
        } else {                    
            auxStringSelect2 = `
                <option id="qualityValue1" value="Césped">Césped</option>
                <option id="qualityValue2" value="Sintético" selected>Sintético</option>
            `;
        }
    }

    let updateProduct = `
        <h3 class="form-title">Actualizar Producto</h3>

        <form id="edit-product-form" autocomplete="off">

            <label for="product-id" class="form-component">ID</label>
            <input type="number" name="product-id" class="form-component" id="product-id-input" value="${product.id}" readonly>

            <label for="product-type" class="form-component">Tipo de Producto</label>
            <select name="product-type" class="form-component" id="product-type-select" required>
                ${auxStringSelect1}
            </select>

            <label for="text-desc" class="form-component" id="text-desc-label">Nombre Estampa</label>
            <input type="text" name="text-desc" class="form-component" id="text-desc-input" value="${product.desc_text}" required>

            <label for="number-desc" class="form-component" id="number-desc-label">Nro. Camiseta Estampa</label>
            <input type="number" name="number-desc" class="form-component" id="number-desc-input" value="${product.desc_number}" required>

            <label for="quality" class="form-component">Calidad</label>
            <select name="quality" class="form-component" id="quality-select" required>
                ${auxStringSelect2}
            </select>

            <label for="price" class="form-component">Precio</label>
            <input type="number" name="price" class="form-component" id="price-input" value="${product.price}" required>

            <label for="image" class="form-component">Imagen</label>
            <input type="text" name="image" class="form-component" id="image-input" value="${product.image}" required>

            <input type="submit" class="form-component" value="Actualizar Producto">

        </form>`;

    edit_product_container.setAttribute("class", "form-container");
    edit_product_container.innerHTML = updateProduct;
  
    let qualityValue1 = document.getElementById("qualityValue1");
    let qualityValue2 = document.getElementById("qualityValue2");
    let textDescription = document.getElementById("text-desc-label");
    let numberDescription = document.getElementById("number-desc-label");
    
    let productTypeSelect = document.getElementById("product-type-select");
    productTypeSelect.addEventListener("change", () => {
        if(productTypeSelect.value === "Camiseta") {

            textDescription.textContent = "Estampa";
            numberDescription.textContent = "Nro. Camiseta";
            qualityValue1.textContent = "Jugador"; qualityValue1.value = "Jugador";
            qualityValue2.textContent = "Hincha"; qualityValue2.value = "Hincha";

        } else if (productTypeSelect.value === "Botines") {

            textDescription.textContent = "Modelo";
            numberDescription.textContent = "Talle";
            qualityValue1.textContent = "Césped"; qualityValue1.value = "Céspedo";
            qualityValue2.textContent = "Sintético"; qualityValue1.value = "Sintético";
        }
    });

    let ediProduct_form = document.getElementById("edit-product-form");
    ediProduct_form.addEventListener("submit", (event) => {
        actualizarProducto(event);
    })
}

/**
 * Actualiza el producto filtrado desde el front, llamando a la ruta del servidor
 * @param event evento para evitar el envío del formulario al destino por defecto
 */
async function actualizarProducto(event) {
    event.preventDefault();

    let formData = new FormData(event.target);               

    let data = Object.fromEntries(formData.entries());
    let idProd = data["product-id"].trim();

    if(!data["product-type"] || !data["text-desc"] || !data["number-desc"] || !data["quality"] || !data["price"] || !data["image"]) {
        alert("Todos los campos son obligatorios!");
        return;
    }

    try {

        let response = await fetch(`${baseUrl}/products/${idProd}`, {
            method: "PUT",
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

            product_list.innerHTML = ``;
            edit_product_container.innerHTML = ``;
            window.location.href = `http://localhost:3000/dashboard`;   /*  Flujo Administrador | 18. Se redirige a la pantalla dashboard. Se muestra el listado de productos, incluyendo el producto modificado.   */

        } else {

            let error = await response.json();
            console.log("Error: ", error.message);
        }

    } catch(error) {

        console.log("Error al enviar los datos. ", error);
        alert("Error al enviar la solicitud");

    }
}