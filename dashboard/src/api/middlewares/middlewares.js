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


function initlizeTheme() {

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
    initlizeTheme
}