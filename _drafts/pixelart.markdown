---
layout: post
title:  "abstracting classics"
type: "experiment"
date:   2014-01-10 13:47:00
---
<!-- Post Content -->
<style>
	#myCanvas:hover {
		cursor: cell;
	}
</style>

<p class="first-paragraph">
During the past few months, I've become increasingly interested in digital art. Glitch, viz, pixels... it's all very exciting, and I've wanted to dive in myself. <a href="/glitch.html">I wasn't making anything I was happy with though.</a>

A week ago I saw <a href="http://work.heinley.com/pixels#asset-656032">"Nightpix" by BJ Heinley</a> and was inspired to recreate more timeless works with code.
</p>

<p>
	As I progressed, I found myself tweaking the level of abstraction so much, I decided to write some code that would let me abstract the paintings in the browser. The experience is a bit like putting on glasses for the first time and realizing that before you couldn't see the leaves on the trees.
</p>

<script type="text/javascript" src="{{ root_path }}/js/paper-full.js"></script>

<canvas id="myCanvas" width="671" height="600">
</canvas>

<img style="display:none" src="{{ root_path }}/img/starrynight.jpg" id="starrynight"/>

<script type="text/paperscript" canvas="myCanvas">
    // necessary?   
    // var ps = new paper.PaperScope(); 
    // paper.install(window); 
    // paper.setup("myCanvas");

    var myPapers = [],
    	i = 0;

    var pixelArt = function (canvas, canvasSize, raster) {
    	myPapers[i] = new paper.PaperScope();
    	myPapers[i].setup(canvas);

    	if ( raster.height > raster.width ) {
    		this.rastRatio = raster.width/raster.height;
    		this.orientation = 'portrait';
    	} else {
    		this.rastRatio	= raster.height/raster.width;
    		this.orientation = 'landscape';
    	}

    	this.canvasSize = canvasSize;
    	this.raster = raster;
    	this.w = 2;
    	this.h = this.w*this.rastRatio;
    };

	pixelArt.prototype.clarify = function() {
		// Since the example image we're using is much too large,
		// and therefore has way too many pixels, lets downsize it to
		// 40 pixels wide and 30 pixels high:
		console.log(2);
		var gridSize;
		if ( this.orientation == 'landscape' ) {
			gridSize = sn.canvasSize[0]/sn.w;
			sn.w = sn.w*1.25
		} else {
			gridSize = sn.canvasSize[2]/sn.h;
			sn.h = sn.h*1.25
		}

		this.size = new Size(sn.w, sn.h);

		var x1 = 0,
			y1 = 0,
			x2 = 0 + gridSize+1,
			y2 = 0 + gridSize;


		for (var y = 0; y < this.height; y++) {
			for(var x = 0; x < this.width; x++) {
				// Get the color of the pixel:
				var color = this.getPixel(x, y);


				// Create a circle shaped path:
				var square = new Rectangle(new Point(x1, y1), new Point(x2, y2));
				var path = new Path.Rectangle(square);

				// Set the fill color of the path to the color
				// of the pixel:
				path.fillColor = color;


				//make some changes to the point location
				x1 = x1 + gridSize;

				x2 = x2 + gridSize;

			}
			x1= 0;
			x2 = x1 + gridSize+1;
			y1 = y1 + gridSize;
			y2 = y2 + gridSize;
		}
		
		// Move the active layer to the center of the view, so all 
		// the created paths in it appear centered.
		project.activeLayer.position = view.center;
	};

	function onMouseDown(event) {
		project.activeLayer.removeChildren();

		sn.clarify();
	}

	    //set up starry night
    var snRast = new Raster('starrynight');
    	snRast.visible = false,
    	snCanvas = document.getElementById('myCanvas')
    	snCanvasSize = [671, 600],
    	sn = new pixelArt( snCanvas, snCanvasSize, snRast );

    snRast.on('load', function() {	
    	console.log(1);
    	sn.clarify();
    };

	// Move the active layer to the center of the view:
	project.activeLayer.position = view.center;

	console.log(sn);
</script>