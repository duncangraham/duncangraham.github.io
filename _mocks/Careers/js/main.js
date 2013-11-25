var navOffset = $('#subnav').offset().top;
var lifeAtPost = $('#lifeAtPost').offset().top;
var careers = $('#careers').offset().top;
var intern = $('#internships').offset().top;
var social = $('#social').offset().top;
var windowOffset;

$('.nav-item').on('click', function(e){
  e.preventDefault();
  var $this = $(this).attr('href');
  var scrollTo;

  if ($this == "#careers") {
    scrollTo = careers;
  } else if ($this == "#lifeAtPost") {
    scrollTo = lifeAtPost;
  } else if ($this == "#internships") {
    scrollTo = intern;
  } else {
    scrollTo = social;
  }


  $("html, body").animate({ scrollTop: scrollTo-30+'px' }, 600);
});


$( window ).scroll(function() {
  windowOffset = $(window).scrollTop();

  $('.link-current').removeClass('link-current');
  if (windowOffset+50 > social) {
	$('.link-social').addClass('link-current');
  } else if (windowOffset+50 > intern) {
	$('.link-interships').addClass('link-current');
  } else if (windowOffset+50 > careers) {
	$('.link-careers').addClass('link-current');
  } else {
    $('.link-life').addClass('link-current');
  }

  if(navOffset < windowOffset+50) {
	$('#subnav').addClass('fixed');
	$('#nav').removeClass('transparent');
  } else {
	$('#subnav').removeClass('fixed');
	$('#nav').addClass('transparent');
  }
});

$('.mobile-filter').on('click',function(){
  var $this = $(this).next();

});


$('.tag').on('click',function(){
  var $this = $(this);
  
  if($this.hasClass('select-all') && $this.hasClass('selected')) {
    $this.text('Select All');

    $('#' + $this.parent().attr('id') + ' li').each(function(key,value){
      $(this).removeClass('selected');
    });


  } else if($this.hasClass('select-all')) {
    $this.text('Select None');

    $('#' + $this.parent().attr('id') + ' li').each(function(key,value){
      $(this).addClass('selected');
    });

  } else if($this.hasClass('selected')){
    $this.removeClass('selected');
  } else {
    $this.addClass('selected');
  }

  var num = random();
  $('.openingsNum').text(num+'/');
});

var random = function getRandomArbitrary() {
  return ~~(Math.random() * (11 - 1) + 1);
};

var testimonials = [ {text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                     author: 'John Smith, Circulation'
                     },
                     {text: 'Bacon ipsum dolor sit amet ball tip boudin brisket, pork belly shoulder cow pork loin. Short ribs pig capicola, sirloin andouille pancetta pork loin.',
                     author: 'Susie Perkins, Accounting'
                     },
                     {text: 'brew kettle bitter yeast sour/acidic, aau alcohol conditioning; autolysis terminal gravity barley degrees plato. pitching cask conditioning final gravity, chocolate malt.',
                      author: 'Vladimir Putin, Engineering'
                     },
                     {text: 'You know what you are? You’re an anti-dentite! It starts with a few jokes and slurs… ‘HEY DENTY!’ Then you will say that dentists should have their own schools!',
                      author: 'Cosmo Kramer, Management'
                     }
                     ];


$('.face').on('click', function(){
  $('.face.current').removeClass('current');
  $(this).addClass('current');
  var i = $(this).index();
  

  $('.quote-text').text(testimonials[i].text);
  $('.quote-author').text(testimonials[i].author);
});


$('.job-sort').on('click',function(){
  $('.list-job-sort').slideToggle();
});


