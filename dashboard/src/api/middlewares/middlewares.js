/**
 * Logea en consola la petición realizada indicando endpoint y fecha de solicitud
 * @param {*} request solicitud de lapetición, con datos internos método (verbo) y url (endpoint)
 * @param {*} response respeuesta de la petición (N/A)
 * @param {*} next da lugar a la ejecución del próximo middleware
 */
const loggerUrl = ((request, response, next) => {
    console.log(`[${new Date().toLocaleString()}] ${request.method} ${request.url}`);
    next();
});


/**
 * Valida que el parámetro recibido sea un id numérico definido
 * @param {*} request solicitud de lapetición, con el dato a validar (id)
 * @param {*} response respeuesta de la petición, informa si la validación falla
 * @param {*} next da lugar a la ejecución del próximo middleware
 * @returns retorna un status 400 como repuesta si la validación falla
 */
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


/**
 * Se encarga de establecer los componentes del control tema
 * Verifica si existe elemento en localStorge con la configuración de tema
 * Alterna los elementos del switch y de estilos tras el cambio de tema
 */
const initializeTheme = () => {

    const indicator = document.getElementById("theme-sign");
    let themeSwitch = document.getElementById("theme-input");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        indicator.setAttribute("src", `/img/temaClaro.png`);
        document.body.classList.add("dark-theme");
        themeSwitch.checked = true;

    } else {

        indicator.setAttribute("src", `/img/temaOscuro.png`);

    }

    themeSwitch.addEventListener("change", () => {        

        if (themeSwitch.checked) {

            indicator.setAttribute("src", `/img/temaClaro.png`);
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");

        } else {

            indicator.setAttribute("src", `/img/temaOscuro.png`);
            document.body.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");

        }
    });

}

export {
    loggerUrl,
    validateId,
    initializeTheme
}