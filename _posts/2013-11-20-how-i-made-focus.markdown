---
layout: entry
title:  "Focus: the tutorial"
type: "tutorial"
date:   2013-11-20 17:00:00
---


<p class="first-paragraph">
<a href='/2013/10/19/focus.html'>Focus</a> was a pretty quick experiment, but once you know how it was done there are tons of directions you can take the code and concept in.</p>

The HTML is pretty cut and dry: A div with span elements containing the individual characters.
{% highlight html %}
	<div class="focus">
		<span>F</span>
		<span>O</span>
		<span>C</span>
		<span>U</span>
		<span>S</span>
	</div>
{% endhighlight %}

The sneakiest bit of this experiment lies in the the CSS. At first I was planning on using webkit-filter: blur, but then I realized by making the text transparent and using the blur radius property of text-shadow I could get the effect I wanted cross browser. 
{% highlight css %}
	.focus span {
		color: transparent;
		text-shadow: 0 0 75px rgb(0,0,0);
	}
{% endhighlight %}

Now, for the javascript. First I created the variables for mouse position, the FOCUS spans, and 2 arrays to store the offset values for the spans.
{% highlight javascript %}
    var mouseX = 0;
    var mouseY = 0;
    var $focus = $('.focus span');
	var spanX = [$focus.length];
	var spanY = [$focus.length];
{% endhighlight %}

Then I used a for each loop to iterate through all of the spans. In this I retrieve the offset.left and offest.top values and multiply them by half of the width or height to center the final offset values for each span.
{% highlight javascript %}
	$focus.each(function(i) {
		var offset = $(this).offset();
		spanX[i] = offset.left + $(this).width()/2;
		spanY[i] = offset.top + $(this).height()/2;
	}); 
{% endhighlight %}


Now here's the best bit. On a mousemove event I first update the mouseX annd mouseY variables. Then I iterate through the focus spans and, based on the saved offset values minus the updated mouse positions, I alter the blur radius of the text shadow.
{% highlight javascript %}
	$('body').mousemove(function(e) {
		mouseX = e.pageX;
	    mouseY = e.pageY;

		$focus.each(function(i) {
			var x = spanX[i] - mouseX;
			var y = spanY[i] - mouseY;
			var d = Math.round(Math.sqrt( x*x + y*y )) * .25;
			$(this).css('textShadow', '0 0 '+d+'px rgb(0,0,0)'); /* THIS IS THE IMPORTANT BIT! */
		}); 
	});
{% endhighlight %}

And that's it! If you have any questions <a href='http://twitter.com/duncangraham'>write to me on my twitter</a>. If you do your own experiments with this code let me know- I'd love to see them.
Cheers!
