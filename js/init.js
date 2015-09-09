(function($) {
	$(function() {

		// Get a reference to the elements
		var redBtn = document.getElementById('fab-red');
		var blueBtn = document.getElementById('fab-blue');
		var greenBtn = document.getElementById('fab-green');
		var orangeBtn = document.getElementById('fab-orange');
		var fab = document.getElementById("main-fab");

		// Initial config variables
		var mainFabColor = "red";
		var currentColor = ".blue";
		var shadowVal = "";

		$('.button-collapse').sideNav();
		$(document).on('scroll', function(e) {
			updateColor();
		});

		// Init konami code easter egg
		var easter_egg = new Konami(function() {
			Materialize.toast('Cheater!', 4000) // 4000 is the duration of the toast
		});

		// Hack to fix broken education section resizing
		$(window).resize(function() {
			var width = $(window).width();
			if (width <= 540) {
				$('#edu-row').removeClass('valign-wrapper');
			} else {
				$('#edu-row').addClass('valign-wrapper');
			}
		})

		$('.button-collapse').sideNav({
			closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
		});

		// Initial check for above hack
		$(document).ready(function() {
			$(window).trigger('resize')
		});

		// Make all local links smoothly scroll to divs rather than snapping to them
		$('a[href*=#]:not([href=#])').on('click', function(event) {
			event.preventDefault();
			var element = $(this.hash);
			$('html,body').animate({
				scrollTop: element.offset().top - 54
			}, 'normal', 'swing');
		});

		// Hack to fix a few FAB glitches on mobile
		fab.addEventListener('click', function(event) {
			$('.fixed-action-btn').openFAB();
		});

		// TODO: DNRY + clean up code
		// Theme buttons in FAB
		redBtn.addEventListener('click', function(event) {
			$(currentColor).not(".fab").addClass('red').removeClass("blue").removeClass("green").removeClass("orange");
			$(currentColor + "-text").addClass('red-text').removeClass("blue-text").removeClass("green-text").removeClass("orange-text");

			currentColor = ".red";

			var a = $('nav').getAlpha();
			var newColor = 'rgba(' + 244 + ',' + 67 + ',' + 54 + ',' + a + ')';
			$('nav').attr('style', 'background-color: ' + newColor + ' !important' + "; box-shadow: " + shadowVal);

			//remove the current meta
			$('meta[name=theme-color]').remove();
			//add the new one
			$('head').append('<meta name="theme-color" content="' + "#f44336" + '">');

			$('#main-fab').removeClass(mainFabColor).addClass("blue");
			mainFabColor = "blue";

			$('.fixed-action-btn').closeFAB();
			$('#about').click();
		});

		blueBtn.addEventListener('click', function(event) {
			$(currentColor).not(".fab").addClass('blue').removeClass("red").removeClass("green").removeClass("orange");
			$(currentColor + "-text").addClass('blue-text').removeClass("red-text").removeClass("green-text").removeClass("orange-text");

			currentColor = ".blue";


			var a = $('nav').getAlpha();
			var newColor = 'rgba(' + 33 + ',' + 150 + ',' + 243 + ',' + a + ')';
			$('nav').attr('style', 'background-color: ' + newColor + ' !important' + "; box-shadow: " + shadowVal);

			//remove the current meta
			$('meta[name=theme-color]').remove();
			//add the new one
			$('head').append('<meta name="theme-color" content="' + "#2196f3" + '">');

			$('.fixed-action-btn').closeFAB();
			$('#about').click();


			$('#main-fab').removeClass(mainFabColor).addClass("red");
			mainFabColor = "red";
		});

		orangeBtn.addEventListener('click', function(event) {
			$(currentColor).not(".fab").addClass('orange').removeClass("blue").removeClass("green").removeClass("red");
			$(currentColor + "-text").addClass('orange-text').removeClass("blue-text").removeClass("green-text").removeClass("red-text");

			currentColor = ".orange";

			var a = $('nav').getAlpha();
			var newColor = 'rgba(' + 255 + ',' + 152 + ',' + 0 + ',' + a + ')';
			$('nav').attr('style', 'background-color: ' + newColor + ' !important' + "; box-shadow: " + shadowVal);

			//remove the current meta
			$('meta[name=theme-color]').remove();
			//add the new one
			$('head').append('<meta name="theme-color" content="' + "#ff9800" + '">');

			$('#main-fab').removeClass(mainFabColor).addClass("indigo accent-4");
			mainFabColor = "indigo accent-4";

			$('.fixed-action-btn').closeFAB();
			$('#about').click();
		});

		greenBtn.addEventListener('click', function(event) {
			$(currentColor).not(".fab").addClass('green').removeClass("blue").removeClass("red").removeClass("orange");
			$(currentColor + "-text").addClass('green-text').removeClass("blue-text").removeClass("red-text").removeClass("orange-text");

			currentColor = ".green";

			var a = $('nav').getAlpha();
			var newColor = 'rgba(' + 76 + ',' + 175 + ',' + 80 + ',' + a + ')';
			$('nav').attr('style', 'background-color: ' + newColor + ' !important' + "; box-shadow: " + shadowVal);

			//remove the current meta
			$('meta[name=theme-color]').remove();
			//add the new one
			$('head').append('<meta name="theme-color" content="' + "#4caf50" + '">');

			$('#main-fab').removeClass(mainFabColor).addClass("purple");
			mainFabColor = "purple";

			$('.fixed-action-btn').closeFAB();
			$('#about').click();

		});

		// Helper which gets alpha balue from RGBA
		$.fn.getAlpha = function() {
			var color = this.css('background-color');
			if (color.substring(0, 4) === 'rgba') {
				var alpha = color.split(',');
				alpha = alpha[alpha.length - 1].trim();
				alpha = alpha.substring(0, alpha.indexOf(")"));
				return alpha;
			} else {
				return 1;
			}
		}

		// Changes color of action bar when scrolling
		function updateColor() {
			var o = $(document).scrollTop() / 500;
			var e = $('nav');
			var d = $('#logo-container');
			if (o > 1.000) {
				o = 1;
				shadowVal = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
			} else {
				shadowVal = "none";
			}
			var currentColor = e.css('background-color');
			var textColor = d.css('color');
			var rgb = currentColor.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',');
			var rgb2 = textColor.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',');
			var newColor = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + o + ')';
			var newColor2 = 'rgba(' + rgb2[0] + ',' + rgb2[1] + ',' + rgb2[2] + ',' + o + ')';
			e.attr('style', 'background-color: ' + newColor + ' !important' + "; box-shadow: " + shadowVal);
			d.attr('style', 'color: ' + newColor2 + ' !important');
		}

		updateColor();

	}); // end of document ready
})(jQuery); // end of jQuery name space