alert('works');

	$('.footer').hover(function(){

		alert('works');
		$('.footer .name').animate({backgroundColor: "#FFFFFF"}, 400);
		$('.footer-content').animate({top: "0"}, 400);
	}, function(){

	});