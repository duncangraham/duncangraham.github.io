---
layout: post
title:  "gyroscopic navigation"
type: "experiment"
date:   2013-12-11 11:00:00
---

<!-- Post specific styles -->
<style>
	nav .home, nav .nav {
		z-index: 1001;
	}
	header, .twitter {
		z-index: 1000;
		position: fixed;
		left: 0em
	}

	header {
		top: 0em;
	}

	.twitter {
		bottom:.5em;
		width:100%;
	}

	body {
    background-color:;
    }

    .center {
    margin: 0px auto;
    }

    #node-field {
	position: absolute;
	top: -21em;
	left: -10em;
	list-style-type: none;
	padding-top: 2em;
    }

    #origin{
    position: fixed;
    top:50%;
    left:50%;
    z-index: 1000;
    color:#ccc;
    }

    .node {
    background-color: #CCC;
    height: 15em;
    width: 15em;
    float: left;
    position: absolute;
    box-sizing: content-box;
    }

/*    .node:active {
    border-radius: 0% !important;
    -webkit-transform: scale(1) !important;
    }*/
</style>
<span id="gyroAlert" class="center"></span>

<!-- Post Content -->
<div id="origin">+</div>
<ul id="node-field" class="center"></ul>



<!-- Post specific js -->
<script type="text/javascript">
 /* Modernizr 2.0 (Custom Build) | MIT & BSD
     * Contains: csstransforms | csstransforms3d | cssclasses | prefixed | teststyles | testprop | testallprops | prefixes | domprefixes
     */
    /*global Modernizr: true */
    ;window.Modernizr=function(a,b,c){function C(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+o.join(c+" ")+c).split(" ");return B(d,b)}function B(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function A(a,b){return!!~(""+a).indexOf(b)}function z(a,b){return typeof a===b}function y(a,b){return x(n.join(a+";")+(b||""))}function x(a){k.cssText=a}var d="2.0",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l,m=Object.prototype.toString,n=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),o="Webkit Moz O ms Khtml".split(" "),p={},q={},r={},s=[],t=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},u,v={}.hasOwnProperty,w;!z(v,c)&&!z(v.call,c)?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],c)};var D=function(a,c){var d=a.join(""),f=c.length;t(d,function(a,c){var d=b.styleSheets[b.styleSheets.length-1],g=d.cssText||d.cssRules[0].cssText,h=a.childNodes,i={};while(f--)i[h[f].id]=h[f];e.csstransforms3d=i.csstransforms3d.offsetLeft===9},f,c)}([,["@media (",n.join("transform-3d),("),i,")","{#csstransforms3d{left:9px;position:absolute}}"].join("")],[,"csstransforms3d"]);p.csstransforms=function(){return!!B(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"])},p.csstransforms3d=function(){var a=!!B(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);a&&"webkitPerspective"in g.style&&(a=e.csstransforms3d);return a};for(var E in p)w(p,E)&&(u=E.toLowerCase(),e[u]=p[E](),s.push((e[u]?"":"no-")+u));x(""),j=l=null,e._version=d,e._prefixes=n,e._domPrefixes=o,e.testProp=function(a){return B([a])},e.testAllProps=C,e.testStyles=t,e.prefixed=function(a){return C(a,"pfx")},g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+s.join(" "):"");return e}(this,this.document);




    $(function() {

    var count = 0,
        tiltLR,
        tiltFB,
        dir,
        originX = $(window).width()/2,
        originY = $(window).height()/2,
        transformProp = Modernizr.prefixed('transform')
        // $items = $('.grid_item'),
        // $itemsLen = $items.length,
        // spanX = [$items.length],
        // spanY = [$items.length],
        rainbow = function () {
            //there are 360 distinct hue values in hsl
            var h = Math.random() * 360;
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

    // Listen for the deviceorientation event and handle the raw data
    window.addEventListener('deviceorientation', function(eventData) {

        // gamma is the left-to-right tilt in degrees, where right is positive
        tiltLR = eventData.gamma/2;
              
        // beta is the front-to-back tilt in degrees, where front is positive
        tiltFB = eventData.beta/2;
              
        // alpha is the compass direction the device is facing in degrees
        dir = eventData.alpha/2;
        // call our orientation event handler
        // deviceOrientationHandler(tiltLR, tiltFB, dir);

        console.log(eventData);
        console.log('titlLR ' + tiltLR);
        console.log('tiltFB ' + tiltFB);

    }, false);    

    //the node constructor
    function Node ( nodeField, transX, transY ) {    
        this.nodeField = nodeField;

        this.element = document.createElement('li');
        this.element.style.backgroundColor = rainbow();
        this.element.className = 'node';
        this.offsetY = this.element.offsetTop;
        this.offsetX = this.element.offsetLeft;
        this.compStyle = window.getComputedStyle( this.element );

        this.element.style[ transformProp ] = 'translate(' + transX + 'px,' + transY + 'px) scale(1)'; 

    };

    Node.prototype.render = function ( ) {   

        var style = this.compStyle,
            matrix = new WebKitCSSMatrix( style.webkitTransform ),
            width = this.element.getBoundingClientRect().width/2,
            height = this.element.getBoundingClientRect().height/2,
            //offset values
            offsetTop = this.element.getBoundingClientRect().top + height, 
            offsetLeft = this.element.getBoundingClientRect().left + width,
            currX = matrix.m41,
            currY = matrix.m42,
            scale = matrix.m43,
            //the new positions, based on how titled the device is
            deltaX = currX+tiltLR,
            deltaY = currY+tiltFB,
            diffX  = Math.abs(originX - offsetLeft ),
            diffY = Math.abs(originY - offsetTop ),
            diffSum = 20/Math.sqrt( (diffX*diffX) + (diffY*diffY) );

        //definitely smoother.
        this.element.style[ transformProp ] = 'translate(' + deltaX + 'px,' + deltaY + 'px) scale(' + diffSum + ')'; 
    };

    //the container object
    function NodeField ( $el, rows, cols ) {
        this.element = $el;
        this.height = this.element.offsetHeight;
        this.width = this.element.offsetWidth;  

        this.nodes = [];


        var frag = document.createDocumentFragment();

        var transX = 0,
            transY = 0;

        //TODO finish this
        for ( var r = 0; r < rows; r++ ) {
            for ( var c = 0; c < cols; c++ ) {
                var node = new Node( this.element, transX, transY );
                frag.appendChild( node.element );
                this.nodes.push( node );
                transX = transX + 240;
            }
            transY = transY + 240;
            transX = 0;
        }


        this.element.appendChild( frag );

        this.animate();
    };

    NodeField.prototype.animate = function () {

        for( i = 0; i < this.nodes.length; i++ ) {
            this.nodes[i].render();
        }

        var frame = this;
        requestAnimFrame( function () { frame.animate(); } );
    };   

    //TODO: Get initial values, then base movement off of delta values.
    
    function init() {
        var $nf = document.getElementById('node-field');
        new NodeField ( $nf, 10, 10 );

      if (typeof window.DeviceOrientationEvent == 'undefined') {
        $('header').text("NO  GYROSCOPE  DETECTED  :(").show();
      }
    }

    window.addEventListener( 'load', init, false);
    });
</script>




