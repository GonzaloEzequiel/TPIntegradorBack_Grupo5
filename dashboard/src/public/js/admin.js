const baseUrl = "http://localhost:3000";

const newAdmin_form = document.getElementById("new-admin-form");

newAdmin_form.addEventListener("submit", async (event) => { 

    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());

    if(!data["admin-name"] || !data["admin-email"] || !data["admin-pass1"] || !data["admin-pass2"]) {
        alert("Todos los campos son obligatorios!");
        return;
    }

    if(data["admin-pass1"] != data["admin-pass2"])
    {
        alert("Las contraseñas ingresadas no coinciden!");
        document.getElementById("admin-pass1-input").value = "";
        document.getElementById("admin-pass2-input").value = "";
        return;
    }

    try {

        let response = await fetch(`${baseUrl}/api/admin`, {
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

            window.location.href = `${baseUrl}/dashboard`;

        } else {

            let error = await response.json();
            console.log("Error: ", error.message);
        }

    } catch (error) {

        console.log("Error al enviar los datos. ", error);
        alert("Error al enviar la solicitud");

    }

});