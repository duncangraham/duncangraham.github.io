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
                $('.view-diamond').addClass('hover-active');
            }, //prevents hovering on scroll
            120);

        $('.view-diamond').removeClass('hover-active');

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

