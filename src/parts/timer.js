function timer() {

  let deadline = '2019-04-13T00:00';


  function getTimeRemaining(endtime) {

    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t / 1000) % 60).toString(),
        minutes = Math.floor((t / 1000 / 60) % 60).toString(),
        hours = Math.floor((t / 1000 / 60 / 60) % 24).toString(),
		    days = Math.floor((t / (1000 * 60 * 60 * 24))).toString();

        function addZero(arg) {
          if (arg.length < 2) {
            arg = '0' + arg;
          } return arg;
        }

    return {
      'total': t,
      'hours': addZero(hours),
      'minutes': addZero(minutes),
      'seconds': addZero(seconds),
      'days': addZero(days)
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
        days = timer.querySelector('.days'),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);

      days.textContent = t.days;
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;


      if (t.total <= 0) {
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
        clearInterval(timeInterval);
      }
    }
  }
  setClock('timer', deadline);
}
module.exports = timer;