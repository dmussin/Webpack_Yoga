function timer() {

    let deadLine = '2019-04-13';
    
        function getTimeRemaninig(endtime) {
            let t = Date.parse(endtime) - Date.parse(new Date()),
                seconds = Math.floor((t / 1000) % 60).toString(),
                minutes = Math.floor((t / 1000 / 60) % 60).toString(),
                hours = Math.floor(t / 1000 / 60 / 60).toString();

        function twoLetter(arg) {
          if (arg.length < 2) {
                arg = '0' + arg;
          } return arg;
        }

    return {
      'total': t,
      'hours': twoLetter(hours),
      'minutes': twoLetter(minutes),
      'seconds': twoLetter(seconds)
    };
  }
    
        function setClock(id, endtime) {
            let timer = document.getElementById(id),
                hours = timer.querySelector('.hours'),
                minutes = timer.querySelector('.minutes'),
                seconds = timer.querySelector('.seconds'),
                timeInterval = setInterval(updateClock, 1000);
        
            function updateClock() {
              let t = getTimeRemaining(endtime);
        
              hours.textContent = t.hours;
              minutes.textContent = t.minutes;
              seconds.textContent = t.seconds;
        
        
              if (t.total <= 0) {
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