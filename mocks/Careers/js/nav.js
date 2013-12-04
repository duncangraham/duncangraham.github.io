$('.nav-toggle').on('click',function(){
	var nav = $('nav');
	var $this = $(this);
	if (nav.hasClass('open')){
		nav.removeClass('open');
		$this.text('MENU ☰')
	} else {
		nav.addClass('open');
		$this.text('CLOSE X')
	}	
});