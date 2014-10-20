---
layout: entry
title:  "Making a Gif-fed Favicon"
tag: experiment
date:   2014-10-19 11:19:00
---

<style>
.favicon-anim {
    text-align: center;
    border: 1px solid #35aff2;
    font-family: 'acta-display';
    font-size: 1.2em;
    color: #35aff2;
    font-style: italic;
    padding: 4em;
    cursor: alias;
}

</style>

This began as a fun, hacky gimmick. Now I'm wondering what's possible in such a constrained medium. Narratives? 3 dimensionality?

I'd love to see what you come up with. Here's the code:

{% highlight js %}
var icoCounter = 2;
var ico = $('#favicon');  
var crazyFavicon = setInterval(function(){
        if ( icoCounter < 7 ) {
        icoCounter = icoCounter + 1;
        } else {
        icoCounter = 1;
        }

        //iterate through frames
        ico.attr('href', '/img/favicon' + icoCounter + '.png');

    }, 50);
{% endhighlight %}


<p>This was partially inspired by <a href="https://en.wikipedia.org/wiki/A_Boy_and_His_Atom">A Boy and His Atom</a>, the smallest film ever made.

<img class="no-margin" src="/img/boy-and-atom.gif" />



<script type="text/javascript">
var icoCounter = 2;
var ico = $('#favicon');  
var crazyFavicon = setInterval(function(){
        if ( icoCounter < 7 ) {
        icoCounter = icoCounter + 1;
        } else {
        icoCounter = 1;
        }
        
        //iterate through frames
        ico.attr('href', '/img/favicon' + icoCounter + '.png');

    }, 50);
</script>
