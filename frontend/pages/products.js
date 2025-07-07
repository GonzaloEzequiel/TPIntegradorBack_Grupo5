import { initlizeTheme } from  "../src/themeSwitch.js";

let navigation = document.querySelectorAll(".nav-button");
navigation.forEach(btn => btn.style.visibility = "visible");

document.addEventListener("DOMContentLoaded", () => { 
    initlizeTheme();
})