window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent'),
        body = document.querySelector('body');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')){
            for (let i = 0; i < tab.length; i++){
                if (target == tab[i]) {
                    hideTabContent(0);

                    showTabContent(i);
                    break;
                }
            } 
        }
    });

    // Timer 

    let deadLine = '2019-04-13';

    function getTimeRamaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000)% 60),
            minutes = Math.floor((t/1000/60)% 60),
            // hours = Math.floor((t/(1000*60*60))),
            hours = Math.floor((t/1000/60)% 24),
            days = Math.floor((t/(1000*60*60*24)));  

            return {
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds, 
                'days' : days
            };
    }

    function setClock(id, endtime) {
        let timer  = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            days = timer.querySelector('.days'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock () {
            let t = getTimeRamaining(endtime),
                // hours.textContent = t.hours;
                // minutes.textContent = t.minutes;
                // seconds.textContent = t.seconds;
                // days.textContent = t.days;

                // if (t.total <= 0) {
                //     clearInterval(timeInterval);
                // }



            //////////////////////////////////


                h = t.hours.toString(),
                m = t.minutes.toString(),
                s = t.seconds.toString(),
                d = t.days.toString();

            if (
                t.total <= 0 &&
                t.hours <= 0 &&
                t.minutes <= 0 &&
                t.seconds <= 0 &&
                t.days <= 0
            ) {
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
                days.textContent = "00";
                clearInterval(timeInterval);
            } else {
                hours.textContent = h.length < 2 ? `0${h}` : h;
                minutes.textContent = m.length < 2 ? `0${m}` : m;
                seconds.textContent = s.length < 2 ? `0${s}` : s;
                days.textContent = d.length < 2 ? `0${d}` : d;
            }
        }
    }

    setClock('timer', deadLine);

    body.addEventListener("click", e => {
        let target = e.target;

        if (target && target.classList.contains("info-header-tab")) {
            tab.forEach(function (e, i) {
                if (target == e) {
                    hideTabContent(0);
                    showTabContent(i);
                }
            });
        }

    // MODAL 

    // let more = document.querySelector('.more'),
    //     descriptionBtn = document.querySelectorAll('.description-btn'),
    //     overlay = document.querySelector('.overlay'),
    //     close = document.querySelector('.popup-close');

    // more.addEventListener('click', function(){
    //     overlay.style.display = 'block';
    //     this.classList.add('more-splash');
    //     document.body.style.overflow = 'hidden';
    // });

    // descriptionBtn[0].addEventListener('click', function(){
    //     overlay.style.display = 'block';
    //     this.classList.add('more-splash');
    //     document.body.style.overflow = 'hidden';
    // });

    // close.addEventListener('click', function(){
    //     overlay.style.display = 'none';
    //     descriptionBtn.classList.remove('more-splash');
    //     document.body.style.overflow = '';
    // });

    // close.addEventListener('click', function(){
    //     overlay.style.display = 'none';
    //     more.classList.remove('more-splash');
    //     document.body.style.overflow = '';
    // });


    const overlay = document.querySelector(".overlay");

    function showModal(modBtn) {
        overlay.style.display = "block";
        info.classList.add("more-splash");
        document.body.style.overflow = "hidden";
    }

    function hideModal(modCloseBtn) {
        overlay.style.display = "none";
        info.classList.remove("more-splash");
        document.body.style.overflow = "";
    }

    if (target && target.classList.contains("more")) {
        showModal(target);
    }
    if (target && target.classList.contains("popup-close")) {
        hideModal(target);
    }
    if (target && target.classList.contains("description-btn")) {
        showModal(target);
    }

});
    //Form 

    let message = {
        loading: 'Загрузка...',
        succes: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так :(' 
    };

    let form = document.querySelector(".main-form"),
        contactForm = document.querySelector("#form"),
        input = document.getElementsByTagName("input"),
        statusMessage = document.createElement("div");

    statusMessage.classList.add("status");

    function sendForm(elem) {
        elem.addEventListener("submit", function (e) {
            e.preventDefault();
            elem.appendChild(statusMessage);

            let formData = new FormData(elem);

            function postData(data) {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();

                    request.open("POST", "server.php");

                    request.setRequestHeader(
                        "Content-Type",
                        "application/json; charset=utf-8"
                    );

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 3) {
                                resolve();
                                // statusMessage.textContent = message.success;
                            } else {
                                reject();
                            }
                        }
                    };
                    request.send(data);
                });
            } // End postData

            function clearInputs() {
                [...input].forEach(elem => (elem.value = ""));
            }
            postData(formData)
                .then(() => (statusMessage.innerHTML = message.loading))
                .then(() => (statusMessage.innerHTML = message.success))
                .catch(() => (statusMessage.innerHTML = message.failure))
                .then(clearInputs);
        });
    }

    sendForm(form);
    sendForm(contactForm);

    // Validation number phone

    const inputsPhone = document.querySelectorAll('input[name="phone"]'),
        inputsCounter = document.querySelectorAll('.counter-block-input');

    // function onlyNumber(input) {
    //     input.onkeydown = function () {
    //         return (this.value = this.value.replace(/[^0-9]/g, ""));
    //     };
    // }
    function onlyNumber(input) {
        input.onkeydown = function () {
            return (this.value = this.value.replace(/[^0-9]/g, ""));
        };
    }
    [...inputsPhone].forEach(elem => onlyNumber(elem));
    [...inputsCounter].forEach(elem => onlyNumber(elem));

    // Slider 

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);
    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        } 

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        // for (let i = 0; i < slides.length; i++){
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }


    function plusSlides(n) {
        showSlides(slideIndex += n);
    } 

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    next.addEventListener('click', function(){
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
               currentSlide(i); 
            }
        }
    });

    // Calculator 

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        counter = document.querySelector('.counter'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        // persons.addEventListener('change', function(){
        //     personsSum = +this.value;
        //     total = (daysSum + personsSum)* 4000;

        //     if(restDays.value == '') {
        //         totalValue.innerHTML = 0;
        //     } else {
        //         totalValue.innerHTML = total;
        //     }
        // });

        // restDays.addEventListener('change', function(){
        //     daysSum = +this.value;
        //     total = (daysSum + personsSum)* 4000;

        //     if(persons.value == '') {
        //         totalValue.innerHTML = 0;
        //     } else {
        //         totalValue.innerHTML = total;
        //     }
        // });

        // place.addEventListener('change', function(){
        //     if (restDays.value == '' || persons.value == '') {
        //         totalValue.innerHTML = 0;
        //     } else {
        //         let a = total; 
        //         totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        //     }
        // });


    function calcTotal() {
        let person = +persons.value,
            days = +restDays.value,
            city = +place.value;
        if ((person == '' || days == '') || (person == 0 || days == 0)) {
            totalValue.textContent = 0;
        } else {
            totalValue.textContent = (days + person) * 4000 * city;
        }
    }

    counter.addEventListener('input', function (event) {
        let target = event.target;

        if (target && target.classList.contains('counter-block-input')) {
            calcTotal();
        }
        if (target && target.options) {
            calcTotal();
        }
    });

});