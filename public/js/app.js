$(document).ready(function() {

	$('.episode__random-color').each(function() {
		$(this).animate({
			backgroundColor: randomColor({luminosity: 'light'})
		}, 1000 );
		$(this).mouseover(function () {
			$(this).stop();
			$(this).animate({
				backgroundColor: randomColor({luminosity: 'light'})
			}, 500 );
		});
	});

 });
