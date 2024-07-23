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
    const resultPage = document.querySelector(".result");
    const resultButtons = resultPage.querySelector(".result__button-block");
    const resultCall = resultPage.querySelector(".result__calling");
    toMainPage.forEach(trigger => {
        trigger.addEventListener("click", () => {
            if (menu.classList.contains("active")) menu.classList.remove("active"); 
            if (slider.classList.contains("active")) slider.classList.remove("active");
            main.style.display = "block";
            resultPage.style.display = "none";
            resultButtons.style.display = "none";
            resultCall.style.display = "block";
        })
    })

    // for result
    const callButton = document.querySelector(".result__call");
    const footer = document.querySelector(".footer");

    callButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const response = await getData("https://swapi.dev/api/people/1/");
        let str = '';
        for (let key in response) {
            str += `<p>${response[key]}</p>`
        }
        footer.innerHTML = `${str}`;
        clearTimeout(int);
        resultCall.style.display = "none";
        resultButtons.style.display = "block";
    })

    // for slider
    const startTest = document.querySelectorAll(".go_test");
    const main = document.querySelector(".main");
    const slider = document.querySelector(".slider");
    const sliderButton = document.querySelector(".slider__button"); 
    const sliderTape = document.querySelector(".slider__tape");
    const getSlides = document.getElementsByClassName("slide");
    const sliderProgress = document.querySelector(".slider__progress_front");
    const processingPage = document.querySelector(".processing");
    
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
                sliderProgress.style.width = "0%";
                sliderButton.style.visibility = "visible";
                main.style.display = "none";
                resultPage.style.display = "none";
                resultButtons.style.display = "none";
                resultCall.style.display = "block";
                footer.innerHTML = '';
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

    sliderButton.addEventListener("click", async (e) => {
        if (e.target.classList.contains("active")) {
            if (offset < offsetMax - 320) {
                e.target.classList.remove("active");
                slickSlide();
            } else {
                e.target.style.visibility = "none";
                slickSlide();
                setTimeout(() => {
                    slider.classList.remove("active");
                    processingPage.style.display = "block";
                }, 300);
                console.log(answers);
                end = Date.parse(new Date()) + 605000; 
                // let response = await fetch("https://swapi.dev/api/people/1/", {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json;charset=utf-8'
                //     },
                //     mode: "no-cors",
                //     body: JSON.stringify(answers)
                // })
                // let result = await response.json();
                // let result = await response.text();
                // console.log(result);
                setTimeout(() => showResultPage(), 5000);
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

    // async function postData(url, data) {
    //     const postData = await fetch(url, {
    //         method: "POST",
    //         mode: "no-cors",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //         data: data
    //     }).then(data => data.json()); 
    // }

    async function showProgress() {
        progressLineWidth = offset / (offsetMax / 100);
        sliderProgress.style.width = progressLineWidth + "%";
    }

    function showResultPage() {
        processingPage.style.display = "none";
        resultPage.style.display = "block";
        // timer();
        int();
    }

    // function timer() {
        const minutes = resultPage.querySelector("#minutes");
        const seconds = resultPage.querySelector("#seconds");
        let min, sec, time;
        let end/*  = Date.parse(new Date()) + 600000 */; 
        const int = () => {
            setTimeout(() => {
                time = end - Date.parse(new Date());
                if (time <= 0) {
                    resultCall.style.display = "none";
                    resultButtons.style.display = "block";
                    minutes.innerHTML = "10";
                    seconds.innerHTML = "00";
                } else {
                    min = Math.floor((time / 1000 / 60) % 60); 
                    sec = Math.floor((time / 1000) % 60); 
                    minutes.innerHTML = getZero(min);
                    seconds.innerHTML = getZero(sec); 
                    int();
                }
            }, 1000)
        }
    //     int();
    // }

    function getZero(num) { 
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
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