$(function() {
$('.js-header-slider').slick({
  dots:     true,
  speed:    500,
  fade:     true,
  cssEase: 'linear'
});
 $('.js-slider-testimonial').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.js-carousel-slider'
});
$('.js-carousel-slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.js-slider-testimonial',
  dots: false,
  centerMode: true,
  centerPadding:'90px',
  focusOnSelect: true,
  prevArrow: $('.arrow-prev'),
  nextArrow: $('.arrow-next')
});
$('.js-form').validate({
  rules: {
    username: {
      required:true,
      rangelength:[2,]
    },
     email: {
      required:true,
      email:true,
    },
      subject: {
      required:true,
      minlength:10
    }
  },
    messages: {
    username: {
      required:'Це поле обовязкове',
      rangelength:[2, 15]
    },
     email: {
      required:'Це поле обовязкове',
      email:true,
    },
      subject: {
      required:'Це поле обовязкове',
      minlength:10
    }
  }
});

});
$(document).ready(function(){
  $(".burger_trigger").click(function(){
    var txt = $(this).text();
    $(".nav").toggle(500);
  if (txt == "Hide")
  {
    $(this).text();
  }
  else
  {
    $(this).text();
  }  
  });
});﻿
