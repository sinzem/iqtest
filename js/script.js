window.addEventListener("DOMContentLoaded", () => {
    // for menu
    const cross = document.querySelector(".cross");
    const menu = document.querySelector(".menu");
    const hamburgers = document.querySelectorAll(".hamburger");

    cross.addEventListener("click", () => {
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
            // document.body.style.overflow = ""; 
        }
    })

    hamburgers.forEach(hamburger => {
        hamburger.addEventListener("click", () => {
            if (!menu.classList.contains("active")) {
                menu.classList.add("active");
                // document.body.style.overflow = "hidden"; 
            }
        })
    })

    // for slider
    const startTest = document.querySelectorAll(".go_test");
    const main = document.querySelector(".main");
    const slider = document.querySelector(".slider"); 

    let answers = [];

    startTest.forEach(trigger => {
        trigger.addEventListener(
            "click", () => {
                if (slider.classList.contains("active")) slider.classList.remove("active")
                if (menu.classList.contains("active")) menu.classList.remove("active"); 
                main.style.display = "none";
                answers = [];
                slider.classList.add("active");
            }
        )
    })

    // to main page
    const toMainPage = document.querySelectorAll(".to_main");
    toMainPage.forEach(trigger => {
        trigger.addEventListener("click", () => {
            if (menu.classList.contains("active")) menu.classList.remove("active"); 
            if (slider.classList.contains("active")) slider.classList.remove("active");
            main.style.display = "block";
        })
    })

    
})