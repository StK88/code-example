(function($) {

  //Carousels
  var carousels = $('.js-carousel-block');
  carousels.each(function(){

    var that = $(this);
    var arrowPrev = that.find('.js-carousel__arrow-prev');
    var arrowNext = that.find('.js-carousel__arrow-next');
    var wrapper = that.find('.js-carousel-wrapper');
    var currentIndex = 0;
    var slides = that.find('.carousel__block');
    var sliderQty = that.find('.carousel__block').length;
    var dots = that.find('.js-carousel-pagination li');

    arrowNext.on('click', function(){
      if(currentIndex <= sliderQty - 2) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      setActive(currentIndex);
    });

    arrowPrev.on('click', function(){
      if(currentIndex >= 1) {
        currentIndex--;
      } else {
        currentIndex = sliderQty - 1;
      }
      setActive(currentIndex);
    });

    dots.on('click', function() {
      var index = $(this).index();
      currentIndex = index;
      setActive(currentIndex);
    });

    function setActive(index) {
      wrapper.css({
        'transform': 'translate3d(-' + index + '00%,0,0)'
      });
      slides.removeClass('active').eq(index).addClass('active');
      dots.removeClass('active').eq(index).addClass('active');
    }

  });

  //Select
  var select = $('.select-wrapper');
  select.each(function(){
    $(this).on('change', function(){
      var selected = $(this).find(":selected").text();
      var label = $(this).find('.select-wrapper__label');

      label.text(selected);
    });
  });

  //Promo circles

  //Default
  var $defaultCircleTop = $('.promo__circle .lettering-top');
  var $defaultCircleBottom = $('.promo__circle .lettering-bottom');
  $defaultCircleTop.arctext({radius: 96});
  $defaultCircleBottom.arctext({radius: 96, dir: -1});
  //Small
  var smallCircleTop = $('.promo__circle--small .lettering-top');
  var smallCircleBottom = $('.promo__circle--small .lettering-bottom');
  smallCircleTop.arctext({radius: 80});
  smallCircleBottom.arctext({radius: 80, dir: -1});


  //countdown
  function getRemaining(endtime) {

    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initTimer(timer, endtime) {

    var timerWrapper = document.querySelector(timer);
    var hoursTag = timerWrapper.querySelector('.hours');
    var minutesTag = timerWrapper.querySelector('.minutes');
    var secondsTag = timerWrapper.querySelector('.seconds');

    function updateTimer() {
      var t = getRemaining(endtime);

      hoursTag.innerHTML = ('0' + t.hours).slice(-2);
      minutesTag.innerHTML = ('0' + t.minutes).slice(-2);
      secondsTag.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateTimer();
    var timeinterval = setInterval(updateTimer, 1000);
  }

  var initialTime = new Date(Date.parse(new Date()) + 2 * 60 * 60 * 1000);
  initTimer('.js-timer', initialTime);

})(jQuery);
