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

    // to main page
    const toMainPage = document.querySelectorAll(".to_main");
    toMainPage.forEach(trigger => {
        trigger.addEventListener("click", () => {
            if (menu.classList.contains("active")) menu.classList.remove("active"); 
            if (slider.classList.contains("active")) slider.classList.remove("active");
            main.style.display = "block";
        })
    })

    // for slider
    const startTest = document.querySelectorAll(".go_test");
    const main = document.querySelector(".main");
    const slider = document.querySelector(".slider");
    const sliderButton = document.querySelector(".slider__button"); 
    const sliderTape = document.querySelector(".slider__tape");
    const getSlides = document.getElementsByClassName("slide");
    const sliderProgress = document.querySelector(".slider__progress_front");
    const processingPage = document.querySelector(".processing")
    
    let offset = 0;
    let offsetMax = 0;
    let answers = {};
    let slides = [];
    let progressLineWidth = 0;

    startTest.forEach(trigger => {
        trigger.addEventListener("click", async () => {
                if (slider.classList.contains("active")) slider.classList.remove("active")
                if (menu.classList.contains("active")) menu.classList.remove("active"); 
                if (sliderButton.classList.contains("active")) sliderButton.classList.remove("active"); 
                sliderButton.style.display = "block";
                main.style.display = "none";
                sliderTape.innerHTML = '';
                answers = {};
                slides = [];
                offset = 0;
                buildSlides();
                sliderTape.style.left = "0px";
                slider.classList.add("active");
            }
        )
    })
    
    sliderButton.addEventListener("click", (e) => {
        if (e.target.classList.contains("active")) {
            if (offset < offsetMax - 320) {
                e.target.classList.remove("active");
                slickSlide();
            } else {
                e.target.style.display = "none";
                slickSlide();
                setTimeout(() => {
                    slider.classList.remove("active");
                    processingPage.style.display = "block";
                }, 300)
            }
        }
    })

    async function buildSlides() {
        const data = await getData("db.json");
        const tests = data.tests;
        tests.forEach(({id, name, type, title, subtitle, img, options}) => {
            new testCard(id, name, type, title, subtitle, img, options, ".slider__tape").render();
        })
        slides = [...getSlides];
        offsetMax = slides.length * 320;
        slides.forEach(slide => {
            slide.addEventListener("click", (e) => {
                if (e.target.nodeName === "LI") {
                    const list = slide.querySelectorAll("li");
                    list.forEach(item => {
                        if (item.classList.contains("active")) item.classList.remove("active");
                    })
                    e.target.classList.add("active");
                    sliderButton.classList.add("active");
                    let key = e.target.parentElement.dataset.name;
                    answers[key] = e.target.textContent;
                }
            })
        })
    }

    function slickSlide() {
        offset += 320;
        sliderTape.style.left = (offset * -1) + "px";
        showProgress();
    }

    async function getData(url) {
        const testList = await fetch(url)
            .then(data => data.json());
        return testList;
    }

    async function showProgress() {
        progressLineWidth = offset / (offsetMax / 100);
        sliderProgress.style.width = progressLineWidth + "%";
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
                        <li class="li li-list">${item}</li>
                    `;
                })
                element.innerHTML = ` 
                    <div class="slide__title slide__title_list">${this.title}</div>
                    <div class="slide__subtitle slide__subtitle_list">${this.subtitle}</div>
                    <ul data-name=${this.name} class="slide__list slide__list_list">
                        ${list}
                    </ul>
                `;
            }
            if (this.type === "color") {
                let list = ``;
                this.options.forEach(item => {
                    list += `
                        <li class="li li-color" style='background-color: ${item[1]}; font-size: 0px'>${item[0]}</li>
                    `;
                })
                element.innerHTML = ` 
                    <div class="slide__title slide__title_color">${this.title}</div>
                    <ul data-name=${this.name} class="slide__list slide__list_color">
                        ${list}
                    </ul>
                `;
            }
            if (this.type === "image_number") {
                let list = ``;
                this.options.forEach(item => {
                    list += `
                        <li class="li li-color">${item}</li>
                    `;
                })
                element.innerHTML = ` 
                    <div class="slide__title slide__title_number">${this.title}</div>
                    <img class="slide__img slide__img_number" src=${this.img} alt="img">
                    <ul data-name=${this.name} class="slide__list slide__list_number">
                        ${list}
                    </ul>
                `;
            }
            if (this.type === "image_list") {
                let list = ``;
                this.options.forEach(item => {
                    list += `
                        <li class="li li-list">${item}</li>
                    `;
                })
                element.innerHTML = ` 
                    <div class="slide__title slide__title_img">${this.title}</div>
                    <img class="slide__img slide__img_img" src=${this.img} alt="img">
                    <ul data-name=${this.name} class="slide__list slide__list_img">
                        ${list}
                    </ul>
                `;
            }
            this.parent.append(element); 
        }
    }
})