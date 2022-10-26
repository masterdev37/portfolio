document.addEventListener("DOMContentLoaded", function(event) {

	// Menu START
	var menuWrap = $('.menu-wrap');
	$('.hamburger').on('click', function() {
		menuWrap.addClass('is-active');
	});
	$('.menu-close').on('click', function() {
		menuWrap.removeClass('is-active');
	});
	// Menu END

	// Product Swiper START
	const productSwiper = new Swiper('.product-swiper', {
		slidesPerView: 2,
		speed: 1000,
		spaceBetween: 20,
		watchSlidesProgress: true,
		pagination: {
			el: '.product-pagination',
			type: 'bullets',
			clickable: true,
		  },
		navigation: {
			nextEl: '.product-button-next',
			prevEl: '.product-button-prev',
		},
	  });
	  // Product Swiper END

	  // Review Swiper START
	  const reviewsSwiper = new Swiper('.reviews-swiper', {
		slidesPerView: 1,
		speed: 1000,
		spaceBetween: 0,
		watchSlidesProgress: true,
		allowTouchMove: true,
		pagination: {
			el: '.reviews-pagination',
			type: 'bullets',
			clickable: true,
		  },
		navigation: {
			nextEl: '.reviews-button-next',
			prevEl: '.reviews-button-prev',
		},
	  });
	  // Review Swiper END


	  	// Product card Swiper START
		var productcardSwiperThumbs = new Swiper('.productcard-swiper__thumbs', {
			speed: 1200,
			spaceBetween: 15,
			slidesPerView: 5,
			freeMode: true,
			watchSlidesProgress: true,
		});
		var productcardSwiper = new Swiper('.productcard-swiper', {
			speed: 1200,
			spaceBetween: 0,
			autoHeight: true,
			thumbs: {
				swiper: productcardSwiperThumbs,
			},
		});

		$('body').on('click', '.counter-js span', function () {
			var $input = $(this).parent().find('input');
			if ($(this).hasClass('counter-plus')) {
				$input.val(parseInt($input.val()) + 1);
				$input.change();
				return false;
			}
			else {
				var count = parseInt($input.val()) - 1;
				count = count < 1 ? 1 : count;
				$input.val(count);
				$input.change();
				return false;
			}
		});
		// Product card Swiper END

		$('input[type="tel"]').inputmask("+38(999) 999-99-99");
		$('.promocode-mask').inputmask("999-999-999");


		// Shopping cart START
		$('body').on('click', '.shopping-cart__delete', function() {
			var card = $(this).parents('.shopping-cart__item');
			card.remove();
		});
		// Shopping cart END

		/* START Scroll functions */
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('.site-header').addClass('is-active');
			} else {
				$('.site-header').removeClass('is-active');
			}
		});

		$('.anchor-link').on('click', function () {
			$('html').animate({
				scrollTop: $($(this).attr("href")).offset().top - 80
			}, 1000);
			return false;
		});
		/* Scroll functions END */

});