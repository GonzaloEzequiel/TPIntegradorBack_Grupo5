const ticketButtons = document.querySelectorAll(".ticket-detail-btn");
const modal = document.getElementById("ticket-modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");

const baseUrl = "http://localhost:3000/api";

ticketButtons.forEach(btn => {
    btn.addEventListener("click", async (event) => {
        event.stopPropagation();
        
        const id = btn.dataset.id;

        try {

            const ticketResponse = await fetch(`${baseUrl}/ticket/${id}`);
            const ticketData = await ticketResponse.json();

            let { ["id"]:tkid, client, date, total } = ticketData.payload[0];

            let HTMLproductos = `
                <h1 class='page-title'>🧾 Ticket de Compra #${tkid}</h1>
                <p><strong>Cliente:</strong> <span id="nombre-cliente">${client}</span></p>
                <p><strong>Fecha:</strong> <span id="fecha-compra">${new Date(date).toLocaleString('es-AR', {
                                    timeZone: 'America/Argentina/Buenos_Aires',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                    }).replace(',', '')}</span></p>
                <p><strong>Empresa:</strong> Fulbo$hop</p>
                <p><strong>Productos:</strong></p>
                <ul>
            `;

            const salesResponse = await fetch(`${baseUrl}/ticket/${id}/sales`);
            const salesData = await salesResponse.json();

            console.log(salesData);

            for(const sale of salesData.payload) {                

                try {

                    let { quantity, subtotal } = sale;

                    let prodResponse = await fetch(`${baseUrl}/products/${sale.id_product}`);
                    let prodData = await prodResponse.json();

                    let { product_type, quality, desc_text } = prodData.payload[0];

                    HTMLproductos += `
                        <li>${product_type} ${quality} ${desc_text} x${quantity} - $${subtotal}</li>
                    `;                    

                } catch (error) {

                    console.error("Error al obtener las ventas", error);

                } 
            }


            HTMLproductos += `
                </ul>
                <hr>
                <p style="display: flex; justify-content: space-between;"><strong>Total:</strong> <span id="total">$${total}</span></p>
            `;

            modalBody.innerHTML = HTMLproductos;
            modal.classList.remove("hidden");

        } catch (error) {

            console.error("Error al obtener el ticket", error);

        }
    });
});



closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});