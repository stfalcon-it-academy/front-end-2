/**
 * Created by user on 02.08.2017.
 */
$(function () {

  $('.js-header-slider').slick({
    infinite: true,
    arrows: false,
    asNavFor: '.js-header-slider-cont'
  });

  $('.js-header-slider-cont').slick({
    infinite: true,
    asNavFor: '.js-header-slider',
    prevArrow: $('.arrow-prev'),
    nextArrow: $('.arrow-next')
  });

  $('.js-slider-content').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.js-slider-desc'
  });

  $('.js-slider-desc').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
    asNavFor: '.js-slider-content',
    prevArrow: $('.arrow-prev-2'),
    nextArrow: $('.arrow-next-2')
  });
});


var $grid = $('.grid').isotope({
  itemSelector: '.element-item',
  layoutMode: 'fitRows'
});


$('.filters-button-group').on('click', 'li', function () {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({filter: filterValue});
});
$('.works-filter').each(function (i, worksFilter) {
  var $worksFilter = $(worksFilter);
  $worksFilter.on('click', 'li', function () {
    $worksFilter.find('.current').removeClass('current');
    $(this).addClass('current');
  });
});
