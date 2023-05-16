$(document).ready(function() {

    function responsiveSlider() {
      var slider = $('#slider');
      var sliderWidth = slider.width();
      var slideList = $('#sliderList');
      var count = 1;
      var items = slideList.find('li').length;
      var prev = $('#prevButton');
      var next = $('#nextButton');
      var timer;
  
      $(window).on('resize', function() {
        sliderWidth = slider.width();
      });
  
      function prevSlide() {
        if (count > 1) {
          count = count - 2;
          slideList.css('left', '-' + count * sliderWidth + 'px');
          count++;
        } else if (count = 1) {
          count = items - 1;
          slideList.css('left', '-' + count * sliderWidth + 'px');
          count++;
        }
      }
  
      function nextSlide() {
        if (count < items) {
          slideList.css('left', '-' + count * sliderWidth + 'px');
          count++;
        } else if (count = items) {
          slideList.css('left', '0px');
          count = 1;
        }
      }
  
      function startTimer() {
        timer = setInterval(function() {
          nextSlide();
        }, 5000);
      }
  
      function resetTimer() {
        clearTimeout(timer);
        startTimer();
      }
  
      startTimer();
  
      next.on('click', function() {
        resetTimer();
        nextSlide();
      });
  
      prev.on('click', function() {
        resetTimer();
        prevSlide();
      });
    }
  
    responsiveSlider();
  
  });
  