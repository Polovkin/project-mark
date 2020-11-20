let burgerMenu = document.querySelector('.icon-menu');
let menu = document.querySelector('.menu__body');
let menuLink = document.querySelectorAll('.menu__link');


burgerMenu.addEventListener('click', function () {
	burgerMenu.classList.toggle('active');
	menu.classList.toggle('active');
	document.querySelector('body').classList.toggle('lock');
})
menuLink.forEach(function (itemlink) {
	itemlink.addEventListener('click', function () {
		burgerMenu.classList.remove('active');
		menu.classList.remove('active');
		document.querySelector('body').classList.remove('lock');
	})
});


//===============================================================================================================================================================

let scr_body = document.querySelector('body');
let scr_blocks = document.querySelectorAll('._scr-sector');
let scr_items = document.querySelectorAll('._scr-item');
let scr_fix_block = document.querySelectorAll('._side-wrapper');
let scr_min_height = 750;

let scrolling = true;
let scrolling_full = true;

let scrollDirection = 0;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);

function scroll_scroll() {
	//scr_body.setAttribute('data-scroll', pageYOffset);
	let src_value = pageYOffset;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (src_value > 10) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
	}
	if (scr_blocks.length > 0) {
		for (let index = 0; index < scr_blocks.length; index++) {
			let block = scr_blocks[index];
			let block_offset = offset(block).top;
			let block_height = block.offsetHeight;

			if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				block.classList.add('_scr-sector_active');
			} else {
				if (block.classList.contains('_scr-sector_active')) {
					block.classList.remove('_scr-sector_active');
				}
			}
			if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				if (!block.classList.contains('_scr-sector_current')) {
					block.classList.add('_scr-sector_current');
				}
			} else {
				if (block.classList.contains('_scr-sector_current')) {
					block.classList.remove('_scr-sector_current');
				}
			}
		}
	}
	if (scr_items.length > 0) {
		for (let index = 0; index < scr_items.length; index++) {
			let scr_item = scr_items[index];
			let scr_item_offset = offset(scr_item).top;
			let scr_item_height = scr_item.offsetHeight;


			let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
			if (window.innerHeight > scr_item_height) {
				scr_item_point = window.innerHeight - scr_item_height / 3;
			}

			if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
				scr_item.classList.add('_active');
				scroll_load_item(scr_item);
			} else {
				scr_item.classList.remove('_active');
			}
			if (((src_value > scr_item_offset - window.innerHeight))) {
				if (scr_item.querySelectorAll('._lazy').length > 0) {
					scroll_lazy(scr_item);
				}
			}
		}
	}

	if (scr_fix_block.length > 0) {
		fix_block(scr_fix_block, src_value);
	}
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	if (custom_scroll_line) {
		let window_height = window.innerHeight;
		let content_height = document.querySelector('.wrapper').offsetHeight;
		let scr_procent = (pageYOffset / (content_height - window_height)) * 100;
		let custom_scroll_line_height = custom_scroll_line.offsetHeight;
		custom_scroll_line.style.transform = "translateY(" + (window_height - custom_scroll_line_height) / 100 * scr_procent + "px)";
	}

	if (src_value > scrollDirection) {
		// downscroll code
	} else {
		// upscroll code
	}
	scrollDirection = src_value <= 0 ? 0 : src_value;
}

setTimeout(function () {
	//document.addEventListener("DOMContentLoaded", scroll_scroll);
	scroll_scroll();
}, 100);

//ScrollOnClick (Navigation)
let pageHeader = document.querySelector('.menu__pages');
let notFound = document.querySelector('.not-found');

if (!pageHeader && !notFound) {
	let link = document.querySelectorAll('._goto-block');
	if (link) {
		let blocks = [];
		for (let index = 0; index < link.length; index++) {
			let el = link[index];
			let block_name = el.getAttribute('href').replace('#', '');
			if (block_name != '' && !~blocks.indexOf(block_name)) {
				blocks.push(block_name);
			}
			el.addEventListener('click', function (e) {
				if (document.querySelector('.menu__body._active')) {
					menu_close();
					body_lock_remove(500);
				}
				let target_block_class = el.getAttribute('href').replace('#', '');
				let target_block = document.querySelector('.' + target_block_class);
				_goto(target_block, 600);
				e.preventDefault();
			})
		}

		window.addEventListener('scroll', function (el) {
			let old_current_link = document.querySelectorAll('._goto-block._active');
			if (old_current_link) {
				for (let index = 0; index < old_current_link.length; index++) {
					let el = old_current_link[index];
					el.classList.remove('_active');
				}
			}
			for (let index = 0; index < blocks.length; index++) {
				let block = blocks[index];
				let block_item = document.querySelector('.' + block);
				if (block_item) {
					let block_offset = offset(block_item).top;
					let block_height = block_item.offsetHeight;
					if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
						let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
						for (let index = 0; index < current_links.length; index++) {
							let current_link = current_links[index];
							current_link.classList.add('_active');
						}
					}
				}
			}
		})
	}
}


function _goto(target_block, speed, offset = 0) {
	let header = '';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
	var rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
}

function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }*/
}


//===============================================================================================================================================================

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__form')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
	}
})();

//===============================================================================================================================================================


//работа с формой===============================================================================================================================================================
$(document).ready(function () {
	if ($(window).width() < 480) {
		$(".js-spollers").addClass("_spollers");
	}
	if ($('._spollers')) {
		$('.spoller__title').click(function (event) {
			if ($('._spollers').hasClass('one')) {
				$('.spoller__title').not($(this)).removeClass('active');
				$('.spoller__text').not($(this).next()).slideUp(300);
				$(this).toggleClass('active').next().slideToggle(300);
			}
		});
	}
	//RADIO
	$.each($('.radio__label'), function (index, val) {
		if ($(this).find('input').prop('checked') == true) {
			$(this).addClass('active');
		}
	});
	$(document).on('click', '.radio__label', function (event) {
		$(this).parents('.radio').find('.radio__label').removeClass('active');
		$(this).parents('.radio').find('.radio__label input').prop('checked', false);
		$(this).toggleClass('active');
		$(this).find('input').prop('checked', true);
		return false;
	});

	$('input,textarea').focus(function () {
		$(this).data('placeholder', $(this).attr('placeholder'))
		$(this).attr('placeholder', '');
	});
	$('input,textarea').blur(function () {
		$(this).attr('placeholder', $(this).data('placeholder'));
	});
});
"use strict"
//===============================================================================================================================================================

let pageWrapper = document.getElementById('wrapper')
let sent = document.getElementById('sendmail')

document.addEventListener('DOMContentLoaded', function () {
	const fullform = document.querySelector('#full-form');
	if (fullform) {


	} else {
		const form = document.querySelector('#form')
		const formContact = document.querySelector('#formContact');

		function localStor(form) {

			let formData = new FormData(form);
			for (let key of formData.keys()) {
				console.log(key);
				localStorage.setItem(key,formData.get(key))
			}

			window.location.href = window.location.href + '/form.html';
		}

		form.addEventListener('submit', async function  (e) {
			e.preventDefault();
			let error = formValidate(form);
			let formData = new FormData(form);
			let chekbox = formData.get('radio');

			if (chekbox === 'right') {
				localStor(form);
			} else {
				if (error === 0) {
					console.log('sens')
					if (error === 0) {
						console.log(formData);
						formContact.classList.add('_sending');
						try {
							let response = await fetch('http://mikle.takasho.work/send_mail.php', {
								method: 'POST',
								body: formData
							});
							console.log(response);
							pageWrapper.classList.add("blur")
							sent.classList.add("open")
							// if (response.ok) {
							// 	let result = await response.json();
							// 	alert(result.message);
							// 	formPreview.innerHTML = '';
							// 	formContact.reset();
							// 	formContact.classList.remove('_sending');
							// } else {
							// 	formContact.classList.remove('_sending');
							// }
						} catch (e) {
							console.log(e);
							throw e
						}

					} else {
						// alert('Заполните обязательные поля');
						console.log(error);
					}
				} else {
					// alert('Заполните обязательные поля');
					console.log(error);
				}
			}

		});

		formContact.addEventListener('submit', async function (e) {
			e.preventDefault();
			let error = formValidate(formContact);
			let formData = new FormData(formContact);
			let chekbox = formData.get('radio');

			if (chekbox === 'right') {
				localStor(formContact);
			} else  {
				if (error === 0) {
					console.log(formData);
					formContact.classList.add('_sending');
					try {
						let response = await fetch('http://mikle.takasho.work/send_mail.php', {
							method: 'POST',
							body: formData
						});

						console.log(response);
						pageWrapper.classList.add("blur")
						sent.classList.add("open")
						// if (response.ok) {
						// 	let result = await response.json();
						// 	alert(result.message);
						// 	formPreview.innerHTML = '';
						// 	formContact.reset();
						// 	formContact.classList.remove('_sending');
						// } else {
						// 	formContact.classList.remove('_sending');
						// }
					 } catch (e) {
					     console.log(e);
					      throw e
					}

				} else {
					// alert('Заполните обязательные поля');
					console.log(error);
				}
			}
		});
	}
	// const form = document.getElementById('form');
	// const forms = document.querySelectorAll('form');
	//
	// for (let index = 0; index < forms.length; index++) {
	//     const form = forms[index];
	//     form.addEventListener('submit', formSend);
	// }


	function formValidate(form) {
		let error = 0;
		let formReq = form.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			let input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}


});

//Тег img переводим в background===============================================================================================================================================================

function ibg() {

	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}

ibg();


//Слайдер===============================================================================================================================================================
$(document).ready(function () {
	var $newSlider = $('.js-main-slider');
	if ($newSlider) {
		$newSlider.slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			speed: 600,
			infinite: false,
			rows: 0,
			initialSlide: 0,
			autoplay: false,
			adaptiveHeight: true,
			appendArrows: $('.main-slider__navigation'),
			prevArrow: '<div class="main-slider__arrow arrow arrow__prev"><img src="img/icons/arrow-slider.svg" alt=""></div>',
			nextArrow: '<div class="main-slider__arrow arrow arrow__next"><img src="img/icons/arrow-slider.svg" alt=""></div>',
			responsive: [{
				breakpoint: 1025,
				settings: {
					variableWidth: true,
					centerMode: true,

				}

			},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						variableWidth: false,
					}

				},


			]
		});
	}
	var $reviews = $('.js-reviews-slider');
	if ($reviews) {
		$reviews.slick({
			slidesPerRow: 2,
			rows: 2,
			fade: true,
			infinite: false,
			autoplay: false,
			dots: false,
			speed: 1200,
			easing: "ease",
			appendArrows: $('.reviews-slider__navigation'),
			prevArrow: '<div class="reviews-slider__arrow arrow arrow__prev"><img src="img/icons/arrow-slider.svg" alt=""></div>',
			nextArrow: '<div class="reviews-slider__arrow arrow arrow__next"><img src="img/icons/arrow-slider.svg" alt=""></div>',
			responsive: [
				{
					breakpoint: 1025,
					settings: {
						slidesPerRow: 1,
						fade: false,
						rows: 1,
						dots: true,
						centerMode: true,
						variableWidth: true,
						slidesToShow: 2,
						speed: 800,
					}

				},
				{
					breakpoint: 480,
					settings: {
						slidesPerRow: 1,
						speed: 1200,
						variableWidth: false,
						slidesToShow: 1,
						rows: 1,
						infinite: true,
					}

				}
			]
		});
	}

});

let sendForm = document.getElementById('full-form');

if (sendForm) {
	console.log(localStorage);
	sendForm.addEventListener('submit', (e) => {

		e.preventDefault()
		let formData = new FormData(sendForm)

		fetch('http://mikle.takasho.work/send_mail.php', {
			method: 'POST',
			body: formData
		})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
				});
	})

}
