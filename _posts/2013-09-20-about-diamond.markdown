---
layout: entry
title:  "Diamond Kaleidoscope"
type: "experiment"
date:   2013-9-20 5:00:00
desc: I wanted to make a kind of scrolling kaleidoscopic diamond. It ended up being a really fun problem to solve and kickstarted the entire redesign of this site.
---
<!-- Post specific styles -->
<style>
body {
	overflow:hidden;
}

h1 {
	display: none;
}

.posts {
  line-height: 1.5em;
	width: 64em;
  margin: -1.75em auto 0em auto;
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -o-transform: scale(0.8);
  transform: scale(0.8); 
}

.about {
  font-size: 80%;
}
.post {
  font-size: 2em;
  text-align: center;
  margin: .1em auto; }
.post-title {
  color: #FFF;
  position: relative;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.15), 2px 2px rgba(0, 0, 0, 0.15), 3px 3px rgba(0, 0, 0, 0.15); }
.post:nth-child(1),
.post:nth-child(11) {
  width: 0;
  height: 0;
  border-left: 62px solid rgba(0, 0, 0, 0);
  border-right: 62px solid rgba(0, 0, 0, 0);
  z-index: 1000;
  position: relative;
  font-size: 0em; }
.post:nth-child(1) {
  border-bottom: 45px solid #333; }
  .post:nth-child(11) {
  border-top: 45px solid #333; }
  .post:nth-child(2),
  .post:nth-child(10) {
  width: 4.4em;
  border-left: 41px solid rgba(0, 0, 0, 0);
  border-right: 41px solid rgba(0, 0, 0, 0);
  height: 0; }
  .post:nth-child(2) {
  border-bottom: 1em solid #333; }
  .post:nth-child(10) {
  border-top: 1em solid #333; }
 
 .post:nth-child(10) .post-title {
    top: -3.3em; }
    .post:nth-child(2) .post-title,
    .post:nth-child(10) .post-title {
  font-size: .1em; }
  .post:nth-child(3) {
  width: 7.4em;
  border-left: 60px solid rgba(0, 0, 0, 0);
  border-right: 60px solid rgba(0, 0, 0, 0);
  height: 0; }

.post:nth-child(9) {
  width: 7.4em;
  border-left: 60px solid rgba(0, 0, 0, 0);
  border-right: 60px solid rgba(0, 0, 0, 0);
  height: 0; }

.post:nth-child(3) {
  border-bottom: 1.5em solid #333; }
.post:nth-child(9) {
  border-top: 1.5em solid #333; }
.post:nth-child(3) .post-title, .post:nth-child(9) .post-title {
  font-size: .5em; }
.post:nth-child(2) .post-title {
  top: -4.7em; }
.post:nth-child(3) .post-title {
  top: 0em; }
.post:nth-child(9) .post-title {
  top: -2.5em; }
.post:nth-child(4), .post:nth-child(8) {
  width: 11.7em;
  border-left: 80px solid rgba(0, 0, 0, 0);
  border-right: 80px solid rgba(0, 0, 0, 0);
  height: 0; }
.post:nth-child(4) {
  border-bottom: 2em solid #333; }
.post:nth-child(8) {
  border-top: 2em solid #333; }
.post:nth-child(4) .post-title, .post:nth-child(8) .post-title {
  font-size: 1em; }
.post:nth-child(4) .post-title {
  top: .6em; }
.post:nth-child(8) .post-title {
  top: -1.3em; }
.post:nth-child(5), .post:nth-child(7) {
  width: 17.4em;
  border-left: 99px solid rgba(0, 0, 0, 0);
  border-right: 99px solid rgba(0, 0, 0, 0);
  height: 0;
  z-index: 2;
  /* bit of a hacky way to deal with the center diamond piece overlapping */
  position: relative; }
.post:nth-child(5) {
  border-bottom: 2.5em solid #333; }
.post:nth-child(7) {
  border-top: 2.5em solid #333; }
.post:nth-child(5) .post-title, .post:nth-child(7) .post-title {
  font-size: 1.5em; }
.post:nth-child(5) .post-title {
  top: .6em; }
.post:nth-child(7) .post-title {
  top: -1em; }
.post:nth-child(6) {
  margin: 70px auto 0em;
  width: 24.3em;
  height: 0;
  border-top: 0px solid #333;
  border-right: 91px solid rgba(0, 0, 0, 0);
  border-bottom: 67px solid;
  border-left: 91px solid rgba(0, 0, 0, 0);
  border-bottom-color: #333;
  position: relative;
  top: -67px; }
  .post:nth-child(6):after {
    content: '';
    position: absolute;
    left: -91px;
    top: 67px;
    width: 24.3em;
    height: 0;
    border-bottom: 67px solid rgba(0, 0, 0, 0);
    border-right: 91px solid rgba(0, 0, 0, 0);
    border-top: 67px solid;
    border-left: 91px solid rgba(0, 0, 0, 0);
    border-top-color: inherit;
    z-index: -2; }
  .post:nth-child(6) .post-title {
    font-size: 2em;
    top: .82em; }
.post:nth-child(n+12) {
  display: none; }

.space_big {
	margin:0em;
}

.twitter {
	width:100%;
}
</style>
<!-- Post Content -->
</div>
<div class="about">
	<ul class="posts">
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro ">
			<span class="post-title">scroll to explore.</span>
		</li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro ">
			<span class="post-title">hi!</span>
		</li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro">
			<span class="post-title">i'm dvncan.</span>
		</li>
		<li class="post post-placeholder tk-adobe-garamond-pro">
			<span class="post-title">designer<em class="fancy">  &amp;  </em>developer</span>
		</li>
		<li class="post post-placeholder tk-adobe-garamond-pro">
			<span class="post-title">living in dc</span>
		</li>
		<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		<li class="post post-placeholder tk-adobe-garamond-pro">
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">currently building things</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<a  class="post-title" href="http://www.washingtonpost.com">for the Washington Post</a>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">I wish the web</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">brought more joy</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">to the world</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">creatively solving problems,</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">making the web and world</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">a nicer place to inhabit</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">this is my digital space</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">to experiment</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">so I'm sorry</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">if things look wonky</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">to you</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">I love coffee</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">and beer/scotch</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">and meeting awesome people</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">if that sounds cool to you</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">send me an email</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">hello@dvncan.com</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">or hit me up on</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">my twitter</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<a class="post-title" href="http://www.twitter.com/duncangraham">@duncangraham</a>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">if you've gotten</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">down this far</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">it's your lucky day!</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">because I've written</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">a haiku for you:</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">beautiful diamond</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">mesmerizes with colors</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">your new overlord</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">- fin -</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">i'd be stoked</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">if you checked out</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title"><a href="/index.html">some stuff i've made</a></span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">that's the end.</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">it'll restart</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro">
				<span class="post-title">if you keep scrolling down</span>
			</li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
			<li class="post post-placeholder tk-adobe-garamond-pro"></li>
		</ul>
	</div>

<script src="/js/jquery.js"></script>
<script src="/js/jquery.mousewheel.js"></script>
<script>
//SCROLLING LIST ITEMS OMGZ SO SWAGGED OUT!
var allowed = true; //should slow down the scroll speed

var oneUp = function () {
    var firstChild = $('.post:first-child');
    firstChild.remove();
    firstChild.appendTo('.posts');
};

var oneDown = function () {
    var lastChild = $('.post:last-child');
    lastChild.remove();
    lastChild.prependTo('.posts');
};

//there's gotta be a way to do this that doesn't fire after EVERY keydown
window.onkeydown = function (ev) {
    if (ev.keyCode == 38) {
        oneUp();
    } else if (ev.keyCode == 40) {
        oneDown();
    }
};

$(document).mousewheel(function (event, delta) {
    var dir = delta > 0 ? 'Down' : 'Up';
    if (allowed === true) {
        allowed = false;
        setTimeout(function () {
                allowed = true;
                $(
                	).addClass('hover-active');
            }, //prevents hovering on scroll
            120);

        $(
        	).removeClass('hover-active');

        if (dir == 'Up') {
            oneUp();
        } else {
            oneDown();
        }
    }
});


//COLORS!

// this is awesome. read it. http://krazydad.com/tutorials/makecolors.php
//he's also really goofy, it's great.

//redone using HSL

function rainbow(numOfSteps, step) {
    //there are 360 distinct hue values in hsl
    //unique number representing % through items. increases approaching 360
    var h = (360 / numOfSteps) * step;
    // FUN FACT! ~~ is shorthand for Math.floor(). not relevant anymore, but still useful.

    var color = "hsla(" + h + ", 75%, 60%, 1)";
    return (color);
}

var numPosts = $('.post').length;

$('.post').each(function (key, value) {
    var $this = $(this);
    var color = rainbow(numPosts, key);

    $this.css('border-bottom-color', color);
    $this.css('border-top-color', color);
});

$('.view-option_square').on('click', function(){
	$('body').addClass('view-square');
});

$('.view-option_diamond').on('click', function(){
	$('body').removeClass('view-square');
});

</script>
