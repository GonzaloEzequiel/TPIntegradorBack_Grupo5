const baseUrl = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", () => {

    configurarActivadores();
    configurarFiltros();
    configurarBuscador();

});

function configurarActivadores() {
    document.querySelectorAll(".activate-product-btn").forEach(btn => {
        btn.addEventListener("click", async event => {

            const idProd = event.target.getAttribute("data-id");
            const confirmacion = confirm("¿Quiere activar este producto?");

            if (!confirmacion) return;

            try {

                const res = await fetch(`${baseUrl}/products/${idProd}`, { method: "PATCH" });
                const result = await res.json();

                if (res.ok) {
                        
                    alert(result.message || "Producto activado");
                    window.location.reload();

                } else {

                    alert(result.message || "No se pudo activar el producto");
                }

            } catch (error) {

                console.error("Error:", error);
                alert("Ocurrió un error al activar el producto");
            }

        });
    });
}

function configurarFiltros() {

    const categoria = document.getElementById("categoria");

    if (categoria)
        categoria.addEventListener("change", aplicarFiltros);

}

function configurarBuscador() {
    const buscador = document.getElementById("search-input");
    if (buscador)
        buscador.addEventListener("input", aplicarFiltros);

}

function aplicarFiltros() {

    const categoria = document.getElementById("categoria")?.value.toLowerCase() || "";
    const termino = document.getElementById("search-input")?.value.toLowerCase() || "";

    const titulo = document.querySelector(".page-title");

    titulo.textContent = ategoria === "botines" ? "Botines" : categoria === "camiseta" ? "Camisetas" : "Galería de Productos";

    document.querySelectorAll(".product-item").forEach(item => {

        const tipo = item.getAttribute("data-type");
        const nombre = item.getAttribute("data-name");

        const coincideTipo = categoria ? tipo.includes(categoria) : true;
        const coincideNombre = termino ? nombre.includes(termino) : true;

        item.style.display = coincideTipo && coincideNombre ? "flex" : "none";
        
    });
}
