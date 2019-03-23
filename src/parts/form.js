
function form() {
    let message = {
        loading: 'Загрузка...',
        succes: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так :(' 
    };
  
    let mainForm = document.querySelector('.main-form'),
        contactForm = document.querySelector("#form"),
        statusMessage = document.createElement('div');
  
    statusMessage.classList.add('status');
  
    function sendForm(form) {
      let input = form.getElementsByTagName('input');
      form.addEventListener('submit', event => {
        event.preventDefault();
        form.appendChild(statusMessage);
        let formData = new FormData(form);
  
  
        function postData(data) {
          return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
  
            request.open("POST", "server.php");
  
            request.setRequestHeader(
              "Content-Type",
              "application/json; charset=utf-8"
            );
            let obj = {};
            data.forEach(function (value, key) {
              obj[key] = value;
            });
            let json = JSON.stringify(obj);
            request.onreadystatechange = function () {
              if (request.readyState < 4) {
                resolve();
              } else if (request.readyState === 4) {
                if (request.status == 200 && request.status < 3) {
                  resolve();
                } else {
                  reject();
                }
              }
            };
            request.send(json);
          });
        } // End postData
        function clearInputs() {
          for (let i = 0; i < input.length; i++) {
            input[i].value = "";
          }
        }
        postData(formData)
          .then(() => (statusMessage.innerHTML = message.loading))
          .then(() => (statusMessage.innerHTML = message.success))
          .catch(() => (statusMessage.innerHTML = message.failure))
          .then(clearInputs);
      });
    }
    sendForm(mainForm);
    sendForm(contactForm);
  
    //Номер телефона
    const inputsPhone = document.querySelectorAll('input[name="phone"]');
  
    function onlyNumber(input) {
      input.onkeyup = function () {
        return (this.value = this.value.replace(/[^0-9,+]/g, ""));
      };
    }
    [...inputsPhone].forEach(elem => onlyNumber(elem));
  }
  module.exports = form;