window.addEventListener("DOMContentLoaded", () => {
    // for menu
    const cross = document.querySelector(".cross");
    const menu = document.querySelector(".menu");
    const hamburger = document.querySelector(".hamburger");

    cross.addEventListener("click", () => {
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
            // document.body.style.overflow = ""; 
        }
    })

    hamburger.addEventListener("click", () => {
        if (!menu.classList.contains("active")) {
            menu.classList.add("active");
            // document.body.style.overflow = "hidden"; 
        }
    })
})