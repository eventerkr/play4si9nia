const Index = {
  init() {
    this.addEvent();
    this.countDownTimer({
      startDate: '09/10/2019 09:00 AM', // 2018년 1월 1일까지, 시간을 표시하려면 01:00 AM과 같은 형식을 사용합니다.
      endDate: '03/30/2021 09:00 AM',
      countDownTextElSelector: 'date_text',
      percentageElSelector: 'percentage',
    });
    const today = new Date()
    if (today.getMonth() == 3 && today.getDate() == 20) {
      confetti.start(10000);
    }
  },
  addEvent() {
    this.share_twitter()
    this.pay_respect()
  },
  countDownTimer({ startDate, endDate, countDownTextElSelector, percentageElSelector }) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let timerInterval;

    const showRemaining = (distance) => {
      if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById(countDownTextElSelector).innerHTML = '경 시그니아 전역 축';
        return;
      }

      const { days, hours, minutes, seconds, milliseconds } = this.convertTimeFormat(distance);
      document.getElementById(countDownTextElSelector).innerHTML = `${days}일 ${hours}시간 ${minutes}분 ${seconds}.${milliseconds}초`;
    }

    const showPercentage = (distance, distance_total) => {
      const percentage = (distance_total - distance) / distance_total * 100;

      const percentageEl = document.getElementById(percentageElSelector);
      percentageEl.style.width = percentage.toFixed(2) + '%';
      percentageEl.setAttribute('aria-valuenow', percentage);

      document.getElementById(percentageElSelector + '_label').innerHTML = percentage.toFixed(6) + '%';
    }

    timerInterval = setInterval(() => {
      const now = new Date();
      const distance = end - now;
      const distance_total = end - start;

      showRemaining(distance);
      showPercentage(distance, distance_total);
    }, 17);
  },
  convertTimeFormat(distance) {
    const timeScale = {
      millisecond : 1,
      second : 1000,
      minute : 1000 * 60,
      hour : 1000 * 60 * 60,
      day : 1000 * 60 * 60 * 24,
    };

    const pad = (num, size) => {
      const s = "000000000" + num;
      return s.substr(s.length - size);
    };

    return {
      days: pad(Math.floor(distance / timeScale.day), 3),
      hours: pad(Math.floor((distance % timeScale.day) / timeScale.hour), 2),
      minutes: pad(Math.floor((distance % timeScale.hour) / timeScale.minute), 2),
      seconds: pad(Math.floor((distance % timeScale.minute) / timeScale.second), 2),
      milliseconds: pad(Math.floor((distance % timeScale.second) / timeScale.millisecond), 3),
    }
  },
  share_twitter() {
    document.querySelector('#twitter_btn').addEventListener('click', () => {
      const text = document.getElementById('date_text').innerHTML;
      const title = '시그니아님의 전역까지 ' + text + ' 남았어요.';
      const url = 'https://play4si9nia.com/';
      const twitter = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title + '&hashtags=play4si9nia';
      window.open(twitter,'popUpWindow','height=300,width=480,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
    });
  },
  pay_respect() {
    document.querySelector('#pay_respect').addEventListener('click', () => {
      var elem = document.getElementById('profile_pic');
      if(elem.style.display == 'none') {
          elem.style.display = 'block';
      } else {
          elem.style.display = 'none';
      }
    });
  },

};

Index.init();
