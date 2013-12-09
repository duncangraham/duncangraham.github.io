    <script type="text/javascript">
    $(function() {

    init();
    
    var count = 0,
        widthMid = $(window).width()/2,
        heightMid = $(window).height()/2,
        //$body = $('body'),
        $items = $('.grid_item'),
        $itemsLen = $items.length,
        spanX = [$items.length],
        spanY = [$items.length],
        rainbow = function (numOfSteps, step) {
            //there are 360 distinct hue values in hsl
            //unique number representing % through items. increases approaching 360
            var h = (360 / numOfSteps) * step;
            // FUN FACT! ~~ is shorthand for Math.floor(). not relevant anymore, but still useful.

            var color = "hsla(" + h + ", 75%, 60%, 1)";
            return (color);
        },
        // shim layer with setTimeout fallback
        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        requestAnimFrame = (function(){
          return  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function( callback, element){
                    window.setTimeout(callback, 1000 / 60);
                  };
        })();



    //the container object
    var NodeField = function ( $el ) {
        this.element = $el;
        this.height = this.element.offsetHeight;
        this.width = this.element.offsetWidth;  

        this.nodes = [];

        //dynamically create nodes later with a document fragment
        //also, postion each absolutely with webkit transforms

        this.animate();
    };

    NodeField.prototype.animate = function () {
        for( i = 0; i < this.nodes.length; i++ ) {
            this.nodes[i].render();
        }

        var frame = this;
        requestAnimFrame( function () { frame.animate(); } );
    };   

    var Node = function () {

    };

    $items.each(function( key ) {
        var color = rainbow( $itemsLen, key );

        $(this).css('background-color', color );
    });

    //TODO: Get initial values, then base movement off of delta values.
    
    function init() {

      if (window.DeviceOrientationEvent) {
        document.getElementById("doEvent").innerHTML = "DeviceOrientation";
        // Listen for the deviceorientation event and handle the raw data
        window.addEventListener('deviceorientation', function(eventData) {
          // gamma is the left-to-right tilt in degrees, where right is positive
          var tiltLR = eventData.gamma;
          
          // beta is the front-to-back tilt in degrees, where front is positive
          var tiltFB = eventData.beta;
          
          // alpha is the compass direction the device is facing in degrees
          var dir = eventData.alpha
          
          // call our orientation event handler
          deviceOrientationHandler(tiltLR, tiltFB, dir);
          }, false);
      } else {
        document.getElementById("doEvent").innerHTML = "Not supported on your device or browser.  Sorry."
      }
    }
  
    function deviceOrientationHandler(tiltLR, tiltFB, dir) {
        // This is for moving the entire body. very choppy
        // var left = $('body').offset().left,
        //     top = $('body').offset().top;

        var style = window.getComputedStyle($('.grid').get(0)),
            matrix = new WebKitCSSMatrix(style.webkitTransform),
            currX = matrix.m41,
            currY = matrix.m42;
            deltaX = currX-tiltLR,
            deltaY = currY-tiltFB;
            
        $items.each(function(i) {
            var offset = $(this).offset();
            spanX[i] = offset.left + $(this).width()/2;
            spanY[i] = offset.top;
            
            var diffX  = (widthMid - (Math.abs(widthMid - spanX[i])))/widthMid,
                diffY = (heightMid - (Math.abs(heightMid - spanY[i])))/heightMid,
                diffSum;

            if (diffX < .1 ) {
                diffX = .1
            }
            if (diffY < .1 ) {
                diffY = .1
            }

            diffSum = ( diffX + diffY )/2;

            console.log(diffSum);


            $(this).css({
                    'webkitTransform': 'scale('+diffSum+')'
            });
        });

        document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
        document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
        document.getElementById("doDirection").innerHTML = Math.round(dir);

        //Below is really choppy. I wonder if I did 2D transform 
        //I could move the processing to the GPU rather than the CPU
        //$('body').offset({ top: top-tiltFB , left: left-tiltLR });


        //definitely smoother.
        $('.grid').css( 'transform', 'translate(' + deltaX + 'px,' + deltaY + 'px)' );        
    }
    

    // If user uses mouse, rather than gyroscope.

    // get mouse position
    // var mouseX = 0;
    // var mouseY = 0;
    // var $items = $('.grid_item');
    // var spanX = [$items.length];
    // var spanY = [$items.length];
    // $items.each(function(i) {
    // var offset = $(this).offset();
    // spanX[i] = offset.left + $(this).width()/2;
    // spanY[i] = offset.top + $(this).height()/2;
    // });
    
    // $('html').mousemove(function(e) {
    //     mouseX = e.pageX;
    //     mouseY = e.pageY;
    //     $items.each(function(i) {
    //         var x = spanX[i] - mouseX,
    //         y = spanY[i] - mouseY,
    //         br = Math.round(Math.sqrt( x*x + y*y ))*.1,
    //         s = 8 / br;
    //         if ( s > 1 ){
    //         s = 1;
    //         }

    //         if ( br < 50 ) {
    //             $(this).css({
    //                 'border-radius': br + '%',
    //                 'webkitTransform': 'scale('+s+')'
    //             });
    //         }
    //     });
    // });
    
    });