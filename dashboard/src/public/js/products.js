const baseUrl = "http://localhost:3000/api";

let btnsActivar = document.querySelectorAll(".activate-product-btn")

btnsActivar.forEach( btn => {

    btn.addEventListener("click", async () => {
        const idProd = event.target.getAttribute("data-id");
        console.log("ID del producto a activar:", idProd);

        const confirmation = confirm("¿Quiere activar este producto?");

        if(!confirmation) {
            alert("Acción cancelada.");

        } else {

            let response = await fetch(`${baseUrl}/products/${idProd}`, { 
                method: "PATCH"
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
        }
    });

});