const loggerUrl = ((request, response, next) => {
    console.log(`[${new Date().toLocaleString()}] ${request.method} ${request.url}`);
    next();
});


const validateId = (request, response, next) => {
    const id = request.params.id;

    if(!id || isNaN(id)) {
        return response.status(400).json({
            error: "El ID debe ser un número"
        });
    }

    //parseamos a entero base10
    request.id = parseInt(id, 10);

    next();
}


const inicializarTema = () => {

    const indicador = document.getElementById("indicadorTema");
    let temaSwitch = document.getElementById("tema");

    const basepath = window.location.pathname.includes("paginas") ? "../recursos" : "./recursos";

    const temaGuardado = localStorage.getItem("tema");
    if (temaGuardado === "oscuro") {
        indicador.setAttribute("src", `${basepath}/temaClaro.png`);
        document.body.classList.add("tema-oscuro");
        temaSwitch.checked = true;
    } else {
        indicador.setAttribute("src", `${basepath}/temaOscuro.png`);
    }

    temaSwitch.addEventListener("change", () => {        

        if (temaSwitch.checked) {

            indicador.setAttribute("src", `${basepath}/temaClaro.png`);
            document.body.classList.add("tema-oscuro");
            localStorage.setItem("tema", "oscuro");

        } else {

            indicador.setAttribute("src", `${basepath}/temaOscuro.png`);
            document.body.classList.remove("tema-oscuro");
            localStorage.setItem("tema", "claro");

        }
    });

}

export {
    loggerUrl,
    validateId,
    inicializarTema
}