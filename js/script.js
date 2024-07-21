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
    const sliderButton = document.querySelector(".slider__button"); 
    const sliderTape = document.querySelector(".slider__tape");

    let offset = 0;
    let answers = [];

    startTest.forEach(trigger => {
        trigger.addEventListener(
            "click", async () => {
                if (slider.classList.contains("active")) slider.classList.remove("active")
                if (menu.classList.contains("active")) menu.classList.remove("active"); 
                main.style.display = "none";
                answers = [];
                offset = 0;
                buildSlides();
                slider.classList.add("active");
            }
        )
    })

    
    sliderButton.addEventListener("click", () => {
        sliderTape.style.left = (offset - 320) + "px";
        offset -= 320;
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

    async function getData() {
        const testList = await fetch("db.json")
            .then(data => data.json());
        return testList;
    }

    async function buildSlides() {
        const data = await getData();
        const tests = data.tests;
        tests.forEach(({id, name, type, title, subtitle, img, options}) => {
            new testCard(id, name, type, title, subtitle, img, options, ".slider__tape").render();
        })
    }
    
    class testCard {
        constructor(id, name, type, title, subtitle = "", img, options, parentSelector) {
            this.id = id;
            this.name = name;
            this.type = type;
            this.title = title;
            this.subtitle = subtitle;
            this.img = img;
            this.options = options;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement("div"); 
            element.classList.add("slide");
            if (this.type === "list") {
                let list = '';
                this.options.forEach(item => {
                    list += `
                        <li>${item}</li>
                    `;
                })
                element.innerHTML = ` 
                    <div class="slide__title slide__title_list">${this.title}</div>
                    <div class="slide__subtitle slide__subtitle_list">${this.subtitle}</div>
                    <ul id=${this.name} class="slide__list slide__list_list">
                        ${list}
                    </ul>
                `;
            }
            if (this.type === "color") {
                let list = ``;
                this.options.forEach(item => {
                    list += `
                        <li style='background-color: ${item}'></li>
                    `;
                })
                element.innerHTML = ` 
                    <div class="slide__title slide__title_color">${this.title}</div>
                    <ul id=${this.name} class="slide__list slide__list_color">
                        ${list}
                    </ul>
                `;
            }
            if (this.type === "image_number") {
                let list = ``;
                this.options.forEach(item => {
                    list += `
                        <li>${item}</li>
                    `;
                })
                element.innerHTML = ` 
                    <div class="slide__title slide__title_number">${this.title}</div>
                    <img class="slide__img slide__img_number" src=${this.img} alt="img">
                    <ul id=${this.name} class="slide__list slide__list_number">
                        ${list}
                    </ul>
                `;
            }
            if (this.type === "image_list") {
                let list = ``;
                this.options.forEach(item => {
                    list += `
                        <li>${item}</li>
                    `;
                })
                element.innerHTML = ` 
                    <div class="slide__title slide__title_img">${this.title}</div>
                    <img class="slide__img slide__img_img" src=${this.img} alt="img">
                    <ul id=${this.name} class="slide__list slide__list_img">
                        ${list}
                    </ul>
                `;
            }
            this.parent.append(element); 
        }
    }
})