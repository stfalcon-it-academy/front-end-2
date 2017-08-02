/**
 * Created by sydney on 01.08.2017.
 */
$(function () {
  $('.js-form').validate();

});

$(document).ready(function(){
  $('.team-content').slick({
    setting-name: setting-value
});
});

$('.filtering').slick({
  slidesToShow: 4,
  slidesToScroll: 4
});

var filtered = false;

$('.js-filter').on('click', function(){
  if (filtered === false) {
    $('.filtering').slick('slickFilter',':even');
    $(this).text('Unfilter Slides');
    filtered = true;
  } else {
    $('.filtering').slick('slickUnfilter');
    $(this).text('Filter Slides');
    filtered = false;
  }
});
