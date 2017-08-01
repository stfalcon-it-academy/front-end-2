@import './project/js/plugins/jquery.js'
@import './project/js/plugins/waypoints.js'
@import './project/js/plugins/countup.js'
@import './project/js/plugins/mixitup.js'
@import './project/js/plugins/slick.js'
@import './project/js/plugins/responsiveTabs.js'
@import './project/js/plugins/validate.js'
@import './project/js/plugins/wow.js'

$(function() {

	/*====== BEGIN variables ======*/
	var grid = {
		xs: 480,
		sm: 768,
		md: 992,
		lg: 1200
	}

	var headerHeight = {
		xs: 60,
		sm: 128,
		md: 65
	}

	var waypointOffset = 0;
	/*====== END variables ======*/

	/*====== BEGIN wow.js ======*/
	new WOW().init();
	/*====== END wow.js ======*/

	/*====== BEGIN mixitup.js ======*/
	var containerEl = document.querySelector('#work-filter');
	var mixer = mixitup(containerEl, {
		animation: {
			enable: true,
			effects: 'fade translateZ(-100px)',
			easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
		}
	});
	/*====== END mixitup.js ======*/

	/*====== BEGIN responsiveTabs.js ======*/
	$('#js-services-tabs').responsiveTabs({
		startCollapsed: 'accordion',
		animation: 'slide'
	});

	$('#js-company-tabs').responsiveTabs({
		startCollapsed: 'accordion',
		animation: 'slide'
	});

	$('#js-company-tabs').responsiveTabs('activate', 2);
	/*====== END responsiveTabs.js ======*/

	/*====== BEGIN countup.js ======*/
	$('.fact-counter').countUp({
		'time': 2000,
		'delay': 10
	});
	/*====== END countup.js ======*/

	/*====== BEGIN jqeury.js ======*/
	$('.header-nav-mobile a').on('click', function() {
		$('#hamburger').slideToggle('slow');
		$('body').removeClass('overflowY');
	});

	$('.header-nav-hamburger').on('click', function() {
		$('#hamburger').slideToggle('slow');
		$('body').toggleClass('overflowY');
	});

	$('.company-tab-list a').on('click', function() {
		$('.company-tab-list a').removeClass('active');
		$(this).addClass('active');
	});

	$('.work-tab a').on('click', function() {
		$('.work-tab a').removeClass('active');
		$(this).addClass('active');
	});

	$('.services-tab li').on('click', function() {
		$('.services-tab li').removeClass('active');
		$(this).addClass('active');
	});

	companyTitleAlign('.company');
	companyTitleAlign('.contact');

	$(window).bind("resize", function() {
		companyTitleAlign('.company');
		companyTitleAlign('.contact');
	});

	function companyTitleAlign(selector) {
		if ($(document).width() < grid.md) {
			$(selector).find('[class*="section-title"]').removeClass('left');
		} else {
			$(selector).find('[class*="section-title"]').addClass('left');
		}
	}

	$('#js-work-load').on('click', function() {
		$(".work-load-content").load("work-load.html");
		$(".work-load").remove();
	});
	/*====== END jqeury.js ======*/

	/*====== BEGIN slick.js ======*/
	$('.slider').slick({
		arrows: false,
		asNavFor: $('.thumbnail-slider')
	});

	$('.thumbnail-slider').slick({
		arrows: true,
		prevArrow: $('.arrow-prev'),
		nextArrow: $('.arrow-next'),
		asNavFor: $('.slider')
	});

	$('.reviews-slider').slick({
		arrows: true,
		swipe: false,
		//adaptiveHeight: true,
		prevArrow: $('.reviews-arrow-prev'),
		nextArrow: $('.reviews-arrow-next'),
		asNavFor: $('.reviews-carusel')
	});

	$('.reviews-carusel').slick({
		arrows: false,
		asNavFor: $('.reviews-slider'),
		slidesToScroll: 1,
		slidesToShow: 4,
		focusOnSelect: true
	});
	/*====== END slick.js ======*/

	/*====== BEGIN waypoints.js ======*/
	$('[href*="slider"]').addClass('active');

	$('[href*="slider"]').click(function() {
		$('html, body').animate({
			scrollTop: $('#header').offset().top
		}, 1000);
		return false;
	});

	$('#header').waypoint(function() {
		$('[class^="header-nav"]').find('a').removeClass('active');
		$('[href*="slider"]').addClass('active');
	}, { offset: -65 });


	$('#company').waypoint(function() {
		$('.progress-bar:eq(0)').animate({
			width: '60%'
		}, 3000);
		$('.progress-bar:eq(1)').animate({
			width: '70%'
		}, 3000);
		$('.progress-bar:eq(2)').animate({
			width: '45%'
		}, 3000);
		$('.progress-bar:eq(3)').animate({
			width: '90%'
		}, 3000);
		$('.progress-bar:eq(4)').animate({
			width: '65%'
		}, 3000);
	}, { offset: 550 });

	if ($(document).width() < grid.sm) {
		waypointOffset = headerHeight.xs;
	} 
	else if ($(document).width() < grid.md) {
		waypointOffset = headerHeight.sm;
	}
	else if ($(document).width() < grid.lg) {
		waypointOffset = headerHeight.md;
	}
	else {
		waypointOffset = headerHeight.md;
	}

	$('#header').waypoint(function() {
		$('.header').css('background', 'rgba(58, 57, 52, 0)');
		$('.header').removeClass('header-min');
	}, { offset: -170 });

	$('#header').waypoint(function() {
		$('.header').css('background', 'rgba(58, 57, 52, 0.95)');
		$('.header').addClass('header-min');
	}, { offset: -171 });

	function scrollClassNav(href, section, offset) {
		$('[href*="' + href + '"]').click(function() {
			$('html, body').animate({
				scrollTop: $('#' + section).offset().top - offset
			}, 1000);
			return false;
		});

		$('#' + section).waypoint(function() {
			$('[class^="header-nav"]').find('a').removeClass('active');
			$('[href*="' + href + '"]').addClass('active');
		}, { offset: offset });
	}

	scrollClassNav('about', 'about', waypointOffset);
	scrollClassNav('skills', 'company', waypointOffset);
	scrollClassNav('work', 'work', waypointOffset);
	scrollClassNav('services', 'services', waypointOffset);
	scrollClassNav('blog', 'news', waypointOffset);
	scrollClassNav('team', 'team', waypointOffset);
	scrollClassNav('contact', 'contact', waypointOffset);
	scrollClassNav('testimonial', 'reviews', waypointOffset);
	/*====== END waypoints.js ======*/

	/*====== BEGIN validate.js ======*/
	$('.contact-form').validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		}
	});

	$('.footer-search-form').validate({
		rules: {
			email: {
				required: true,
				email: true
			}
		}
	});
	/*====== END validate.js ======*/
});