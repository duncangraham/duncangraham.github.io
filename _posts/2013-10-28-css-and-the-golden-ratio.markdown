---
layout: entry
title:  "CSS and the Golden Ratio"
type: "experiment"
date:   2013-10-28 23:00:00
---
<style>
	div {
		overflow: visible;
	}
	
	.experiment-container {
		margin: 8em 0em 4em 55%;
	}
	.golden-ratio{
		font-size: 1.618033988749894848204586834em;
		background-color: #F00;
		opacity: .75;
	}
	.golden-ratio.horiz {
		height: 1em;
		width: 1.618033988749894848204586834em;
	}
	.golden-ratio.vert {
		width: 1em;
		height: 1.618033988749894848204586834em;
	}
	.postition-tweak.vert {
		position:relative;
		bottom:1em;
	}
	.postition-tweak.horiz {
		position:relative;
		right:1em;
	}
	.golden-ratio.spiral-old {
		background-color: #09F;
	}

	.interactive .golden-ratio.spiral {
		background-color: #30F;
	}
	.spiral-old.top {
		border-radius: 1.618033988749894848204586834em 1.618033988749894848204586834em 0 0;
	-moz-border-radius: 1.618033988749894848204586834em 1.618033988749894848204586834em 0 0;
	-webkit-border-radius: 1.618033988749894848204586834em 1.618033988749894848204586834em 0 0;
	}
	.spiral-old.bottom {
		border-radius:  0 0 1.618033988749894848204586834em 1.618033988749894848204586834em;
	-moz-border-radius: 0 0 1.618033988749894848204586834em 1.618033988749894848204586834em;
	-webkit-border-radius: 0 0 1.618033988749894848204586834em 1.618033988749894848204586834em;
	}
	.spiral-old.right {
		border-radius: 1.618033988749894848204586834em 0 0 1.618033988749894848204586834em;
	-moz-border-radius: 1.618033988749894848204586834em 0 0 1.618033988749894848204586834em;
	-webkit-border-radius: 1.618033988749894848204586834em 0 0 1.618033988749894848204586834em;
	}
	.spiral-old.left {
		border-radius: 0 1.618033988749894848204586834em 1.618033988749894848204586834em 0;
	-moz-border-radius: 0 1.618033988749894848204586834em 1.618033988749894848204586834em 0;
	-webkit-border-radius: 0 1.618033988749894848204586834em 1.618033988749894848204586834em 0;
	}
	.golden-ratio.spiral-old {
		background-color: #09F;
	}
	.golden-ratio.spiral {
		background-color: #0A2;
	}
	.spiral.top {
		border-radius: 12em 8em 0 0;
	-moz-border-radius: 12em 8em 0 0;
	-webkit-border-radius: 12em 8em 0 0;
	}
	.spiral.bottom {
		border-radius:  0 0 12em 8em;
	-moz-border-radius: 0 0 12em 8em;
	-webkit-border-radius: 0 0 12em 8em;
	}
	.spiral.right {
		border-radius: 8em 0 0 12em;
	-moz-border-radius: 8em 0 0 12em;
	-webkit-border-radius: 8em 0 0 12em;
	}
	.spiral.left {
		border-radius: 0 12em 8em 0;
	-moz-border-radius: 0 12em 8em 0;
	-webkit-border-radius: 0 12em 8em 0;
	}
	.hide {
		display: none;
	}
</style>
<p class="first-paragraph">
A few weekes ago while at Brooklyn Beta, I was lucky enough to sit next to <a href="https://twitter.com/ScottKellum">Scott Kellum</a> during lunch. He mentioned how recently he had been interested in the idea of making fractals using nested CSS shapes with sizes defined by ems.
</p>
I was excited to play with the idea, and so I began working with the <a href="http://en.wikipedia.org/wiki/Golden_ratio">golden ratio (1.618033988...)</a>. (after 4 years of architecture school, it still has a soft spot in my heart.)
Getting the basic shape was easy enough, though I needed to do some tweaking with the positioning to keep the rectangles radiating from the center.
<div class="experiment-container">
	<div class="golden-ratio horiz">
		<div class="golden-ratio vert">
			<div class="golden-ratio horiz">
				<div class="golden-ratio vert postition-tweak">
					<div class="golden-ratio horiz postition-tweak">
					</div>
				</div>
			</div>
		</div>
	</div>
</div><small class="font-small show-code center cursor-pointer no-margin">
	click to toggle css visibility
</small>
<div class="hide">
	{% highlight css %}
	.golden-ratio{
	font-size: 1.618033988749894848204586834em;
	background-color: #F00;
	opacity: .75;
	}
	.golden-ratio.horiz {
	height: 1em;
	width: 1.618033988749894848204586834em;
	}
	.golden-ratio.vert {
	width: 1em;
	height: 1.618033988749894848204586834em;
	}
	.postition-tweak.vert {
	position:relative;
	bottom:1em;
	}
	.postition-tweak.horiz {
	position:relative;
	right:1em;
	}
	{% endhighlight %}
</div><small class="font-small show-code center cursor-pointer no-margin">
	click to toggle html visibility
</small>
<div class="hide">
	{% highlight html %}
	<div class="experiment-container">
		<div class="golden-ratio horiz">
			<div class="golden-ratio vert">
				<div class="golden-ratio horiz">
					<div class="golden-ratio vert postition-tweak">
						<div class="golden-ratio horiz postition-tweak">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	{% endhighlight %}
</div>
<p></p>
Then I began work to create the ubiquitous golden spiral. however, after a bit, I realized my css was flawed (see below). nothing aligned quite right.
<div class="experiment-container">
	<div class="golden-ratio spiral-old top horiz">
		<div class="golden-ratio spiral-old right vert">
			<div class="golden-ratio spiral-old bottom horiz">
				<div class="golden-ratio spiral-old vert left postition-tweak">
					<div class="golden-ratio spiral-old horiz top postition-tweak">
					</div>
				</div>
			</div>
		</div>
	</div>
</div><small class="font-small show-code center cursor-pointer no-margin">
	click to toggle css visibility
</small>
<div class="hide">
	{% highlight css %}
	/* below is the additional css for the curve */
	.golden-ratio.spiral {
	background-color: #09F;
	}
	.spiral.top {
	border-radius: 1.618033988749894848204586834em 1.618033988749894848204586834em 0 0;
	-moz-border-radius: 1.618033988749894848204586834em 1.618033988749894848204586834em 0 0;
	-webkit-border-radius: 1.618033988749894848204586834em 1.618033988749894848204586834em 0 0;
	}
	.spiral.bottom {
	border-radius:  0 0 1.618033988749894848204586834em 1.618033988749894848204586834em;
	-moz-border-radius: 0 0 1.618033988749894848204586834em 1.618033988749894848204586834em;
	-webkit-border-radius: 0 0 1.618033988749894848204586834em 1.618033988749894848204586834em;
	}
	.spiral.right {
	border-radius: 1.618033988749894848204586834em 0 0 1.618033988749894848204586834em;
	-moz-border-radius: 1.618033988749894848204586834em 0 0 1.618033988749894848204586834em;
	-webkit-border-radius: 1.618033988749894848204586834em 0 0 1.618033988749894848204586834em;
	}
	.spiral.left {
	border-radius: 0 1.618033988749894848204586834em 1.618033988749894848204586834em 0;
	-moz-border-radius: 0 1.618033988749894848204586834em 1.618033988749894848204586834em 0;
	-webkit-border-radius: 0 1.618033988749894848204586834em 1.618033988749894848204586834em 0;
	}
	{% endhighlight %}
</div><small class="font-small show-code center cursor-pointer">
	click to toggle html visibility (same old, just some more classes)
</small>
<div class="hide">
	{% highlight html %}
	<div class="experiment-container">
		<div class="golden-ratio spiral top horiz">
			<div class="golden-ratio spiral right vert">
				<div class="golden-ratio spiral bottom horiz">
					<div class="golden-ratio spiral vert left postition-tweak">
						<div class="golden-ratio spiral horiz top postition-tweak">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	{% endhighlight %}
</div>
<p></p>
After getting lost in the possibilities and hacking away at the CSS, I realized the answer was simple (as is the case with most problems of this type). I was using even border-radii when the arcs in a golden spiral are actually lopsided. whoops.
<div class="experiment-container">
	<div class="golden-ratio spiral top horiz">
		<div class="golden-ratio spiral right vert">
			<div class="golden-ratio spiral bottom horiz">
				<div class="golden-ratio spiral vert left postition-tweak">
					<div class="golden-ratio spiral horiz top postition-tweak">
					</div>
				</div>
			</div>
		</div>
	</div>
</div><small class="font-small show-code center cursor-pointer no-margin">
	click to toggle css visibility
</small>
<div class="hide">
	{% highlight css %}
	.golden-ratio.spiral {
	background-color: #0A2;
	}
	.spiral.top {
	border-radius: 12em 8em 0 0;
	-moz-border-radius: 12em 8em 0 0;
	-webkit-border-radius: 12em 8em 0 0;
	}
	.spiral.bottom {
	border-radius:  0 0 12em 8em;
	-moz-border-radius: 0 0 12em 8em;
	-webkit-border-radius: 0 0 12em 8em;
	}
	.spiral.right {
	border-radius: 8em 0 0 12em;
	-moz-border-radius: 8em 0 0 12em;
	-webkit-border-radius: 8em 0 0 12em;
	}
	.spiral.left {
	border-radius: 0 12em 8em 0;
	-moz-border-radius: 0 12em 8em 0;
	-webkit-border-radius: 0 12em 8em 0;
	}
	{% endhighlight %}
</div><small class="font-small show-code center cursor-pointer no-margin">
	click to toggle html visibility (only the classes really change)
</small>
<div class="hide">
	{% highlight html %}
	<div class="experiment-container">
		<div class="golden-ratio spiral top horiz">
			<div class="golden-ratio spiral right vert">
				<div class="golden-ratio spiral bottom horiz">
					<div class="golden-ratio spiral vert left postition-tweak">
						<div class="golden-ratio spiral horiz top postition-tweak">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	{% endhighlight %}
</div>
<p></p>

One step closer to global domination! Then next step was some basic interactivity. Scroll up and down on the beginning of the spiral below to grow and shrink it.

<div class="experiment-container interactive">
	<div class="golden-ratio spiral top horiz">
		<div class="hide golden-ratio spiral right vert">
			<div class="hide golden-ratio spiral bottom horiz">
				<div class="hide golden-ratio spiral vert left postition-tweak">
					<div class="hide golden-ratio spiral horiz top postition-tweak">
						<div class="hide golden-ratio spiral vert right">
							<div class="hide golden-ratio spiral horiz bottom">
								<div class="hide golden-ratio spiral vert left postition-tweak">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<br/>

It's pretty basic, but it's a start. I'm interested in exploring what else can be done in this same vein.

Now, time to tackle the <a href="http://en.wikipedia.org/wiki/Mandelbrot_set">Mandelbrot set</a>.



<script src="/js/jquery.mousewheel.js"></script>
<script type="text/javascript">
$(function() {
	$(".show-code").on('click', function(){
		$(this).next().slideToggle();
	});

	var allowed = true; //should slow down the scroll speed

	$('.interactive').mousewheel(function (event, delta) {
		$('body').css('overflow', 'hidden');
		var dir = delta > 0 ? 'Up' : 'Down';
    	if (allowed === true) {
        allowed = false;
        setTimeout(function () {
                allowed = true;
                //$('.view-diamond').addClass('hover-active');
            }, //prevents hovering on scroll
            120);

        var $this = $(this);

        if (dir == 'Up') {
            hideOne($this);
        } else {
            showOne($this);
        }
    }

	});

	//know a better way to do this? I'd love to hear about it.
	//email me @ dvncandev@gmail.com
	setInterval(function(){unfreezeScreen()}, 800);;

	var showOne = function($this){
		$this.find(".hide:first").show().addClass("show").removeClass('hide');
	};

	var hideOne = function($this){
		$this.find(".show:last").hide().addClass("hide").removeClass('show');
	};

	var unfreezeScreen = function(){
		$('body').css('overflow', 'scroll');
	};

});


</script>
