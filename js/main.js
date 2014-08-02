var $body = $('body');
var $win = $(window),
    mousePos,
    w = 0,
    h = 0,
    rgb = [],
    rgb2 = [],
    getWidth = function () {
        w = $win.width();
        h = $win.height();
    },
    rainbow = function () {
        //there are 360 distinct hue values in hsl
        var h = Math.random() * 360;
        // FUN FACT! ~~ is shorthand for Math.floor(). not relevant anymore, but still useful
        var color = "hsla(" + h + ", 75%, 60%, 1)";
        return (color);
    };


function checkRdio () {

}

$win.mousemove(function (e) {
    mousePos = e;
});

//for the V in dvncan and the everything on insanity mode
var colorize = function (e) {
    rgb = [
        Math.round(e.pageX / w * 255),
        Math.round(e.pageY / h * 255),
        150
    ];

    if ($('body').hasClass('insanity')) {
        rgb2 = [
            Math.round(e.pageY / h * 255),
            Math.round(e.pageX / w * 255),
            150
        ];

        $body.css({
            'background-color': 'rgb(' + rgb.join(',') + ')',
            'color': 'rgb(' + rgb2.join(',') + ')'
        });
        $('.desc').css({
            'background-color': 'rgb(' + rgb.join(',') + ')',
            'color': 'rgb(' + rgb2.join(',') + ')'
        });
        $('.sort-opt a, .font-light').css({
            'color': 'rgb(' + rgb2.join(',') + ')'
        });
        $('.entry-sort, .shape').css({
            'border-top-color': 'rgb(' + rgb2.join(',') + ')',
            'border-bottom-color': 'rgb(' + rgb2.join(',') + ')'
        });

        $('header .char2').css('color', '#FFF');

    } else {
        $('header .char2').css('color', 'rgb(' + rgb.join(',') + ')');
        $('.first-paragraph:first-letter').css('color', 'rgb(' + rgb.join(',') + ')');
    }
};


var icoCounter = 2;
var ico = $('#favicon');  




$win.resize(getWidth).mousemove(function (e) {
    colorize(mousePos);
}).resize();

$('header .char2.insanity').on('click', function () {
    if ($body.hasClass('insanity')) {
        $body.removeClass('insanity');

        if($body.hasClass('dark')) {
            $body.css({
                'background-color': '#14081B',
                'color': '#444'
            });
        } else {
            $body.css({
                'background-color': '#FFF',
                'color': '#333'
            });
        }
        $('.desc').css({
            'background-color': '#14081B',
            'color': '#FFF'
        });
        $('.sort-opt a').css({
            'color': 'inherit'
        });
        $('.font-light').css({
            'color': ''
        });
        $('.entry-sort, .shape').css({
            'border-top-color': '#333',
            'border-bottom-color': '#333'
        });
        colorize(mousePos);
        clearInterval(crazyFavicon);
        ico.attr('href', '/img/favicon.png');
    } else {
        $body.addClass('insanity');      
        colorize(mousePos);  
        crazyFavicon = setInterval(function(){
                                if ( icoCounter < 7 ) {
                                    icoCounter = icoCounter + 1;
                                } else {
                                    icoCounter = 1;
                                }

                                ico.attr('href', '/img/favicon' + icoCounter + '.png');

                            }, 50);

    }
});


//Sorting stuff. seems like a bit much for such a little task.
var entArr = [];
$('.entry').each(function (key, value) {
    entArr.push(value);
});

$('.sort-date a').on('click', function () {
    changeSort($(this));

    entArr.sort(function (a, b) {
        if (a.classList[1] < b.classList[1])
            return 1;
        if (a.classList[1] > b.classList[1])
            return -1;
        // a must be equal to b
        return 0;
    });

    $('.sort-type').addClass('font-light');
    $('.sort-date').removeClass('font-light');

    $('.entries').html(entArr);
});

$('.sort-type a').on('click', function () {
    changeSort($(this));

    entArr.sort(function (a, b) {
        if (a.classList[0] > b.classList[0])
            return 1;
        if (a.classList[0] < b.classList[0])
            return -1;
        // a must be equal to b
        return 0;
    });

    $('.sort-date').addClass('font-light');
    $('.sort-type').removeClass('font-light');

    $('.entries').html(entArr);
});



var changeSort = function ($this) {
    $('.selected').removeClass('selected');
    $this.addClass('selected');
};
