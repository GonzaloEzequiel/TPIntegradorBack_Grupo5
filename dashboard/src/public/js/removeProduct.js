const baseUrl = "http://localhost:3000/api";

let get_product_form = document.getElementById("get-product-form");
let delete_product_container = document.getElementById("delete-product-container");
let product_list = document.getElementById("product-list");

get_product_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    try {

        product_list.innerHTML = "<p>Cargando producto...</p>";

        let formData = new FormData(event.target); 
        let data = Object.fromEntries(formData.entries());

        let idProd = data["product-id"].trim();

        if(!idProd) {
            throw new Error(`Error en el envio de datos del formulario.`);
        }

        let response = await fetch(`${baseUrl}/products/${idProd}`);
        
        if(!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        let datos = await response.json();

        if(!datos.payload || datos.payload.length === 0) {
            throw new Error("No se encontro el producto solicitado.")
        }
                            
        let producto = datos.payload[0];
        mostrarProducto(producto);

        let deleteProduct_btn = document.getElementById("delete-product-btn");
        deleteProduct_btn.addEventListener("click", async (event) => {          /*  Flujo Administrador | 11. El administrador elige un producto activo para eliminar. Presiona el botón eliminar de ese producto. */
            event.stopPropagation();

            let confirmation = confirm("¿Quiere eliminar este producto?");      /*  Flujo Administrador | 12. Se muestra un modal que pregunta si está seguro de eliminar. El administrador presiona el botón confirmar. */

            if(!confirmation) {
                alert("Acción cancelada.");
            } else {
                const eliminado = await eliminarProducto(idProd).then(mostrarProducto(producto));                                        /*  Flujo Adminsitrador | 13. El producto eliminado pasa a mostrarse en estado inactivo (baja lógica).  */
                
            }
        });
        

    } catch (error) {

        console.error("Error al obtener el producto: ", error);
        product_list.innerHTML = `<p>${error.message}</p>`

    }

});

/**
 * Muestra los datos del producto filtrado
 * @param prod el producto filtrado
 */
function mostrarProducto(prod) {

    let HTMLProducto = ``;
    product_list.innerHTML = HTMLProducto;
    
    HTMLProducto = `
            <li class="product-item">
                <img src="${prod.image}" alt="${prod.nombre}" class="product-img">
                <p>ID: ${prod.id} / ${prod.product_type} ${prod.quality} ${prod.desc_text} N°${prod.desc_number} / <strong>Precio: $${prod.price}</strong> / ${prod.active ? "[Activo]" : "[Inactivo]"}</p>
                <input type="button" class="form-button form-component" id="delete-product-btn" value="Eliminar Producto">
            </li>
        `;
    product_list.innerHTML = HTMLProducto;
}

/**
 * Elimina el producto filtrado
 * @param id identificador del producto filtrado
 */
async function eliminarProducto(id) {

    try {

        let response = await fetch(`${baseUrl}/products/${id}`, {
            method: "DELETE"
        });

        let result = await response.json();

        if(response.ok) {

            alert(result.message);
            window.location.href = `http://localhost:3000/dashboard`; 
            return true;

        } else {

            console.error("Error: ", result.message);
            return false;

        }

    } catch(error) {

        console.error("Error en la solicitud DELETE: ", error);
        alert("Ocurrió un error al eliminar un producto");
        return false;

    }
}