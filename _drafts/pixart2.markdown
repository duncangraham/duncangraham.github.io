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

<script type="text/javascript">
window.onload = function() {


// Evaluates code in Text area and draws to referenced Canvas
function DrawCanvas(thisCanvas, thisRaster){
	// initializes paperJS scope, probably a way to NOT have to do this everytime
	// but I don't know what it is
	paper.setup(document.getElementById(thisCanvas));
	paper.project.activeLayer.removeChildren();

	var raster = new paper.Raster(thisRaster),
		rastRatio,
		orientation,
		w,
		h,
		gridSize;

    	if ( raster.height > raster.width ) {
    		rastRatio = raster.width/raster.height;
    		orientation = 'portrait';
    	} else {
    		rastRatio = raster.height/raster.width;
    		orientation = 'landscape';
    	}


    raster.visible = false;
    raster.on('load', function() {
		// Since the example image we're using is much too large,
		// and therefore has way too many pixels, lets downsize it to
		// 40 pixels wide and 30 pixels high:

		//the max width is always 671
		h = w*rastRatio,
		gridSize = 671/w;

		raster.size = new paper.Size(w, h);

		var x1 = 0,
			y1 = 0,
			x2 = 0 + gridSize+1,
			y2 = 0 + gridSize;


		for (var y = 0; y < raster.height; y++) {
			for(var x = 0; x < raster.width; x++) {
				// Get the color of the pixel:
				var color = raster.getPixel(x, y);


				// Create a circle shaped path:
				var square = new paper.Rectangle(new paper.Point(x1, y1), new paper.Point(x2, y2));
				var path = new paper.Path.Rectangle(square);

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
	});

	paper.view.draw();


	var clarify = function(width) {
		w = width;


		// Since the example image we're using is much too large,
		// and therefore has way too many pixels, lets downsize it to
		// 40 pixels wide and 30 pixels high:

		//the max width is always 671
		var h = w*rastRatio,
			gridSize = 671/w;

		raster.size = new Size(w, h);

		var x1 = 0,
			y1 = 0,
			x2 = 0 + gridSize+1,
			y2 = 0 + gridSize;


		for (var y = 0; y < raster.height; y++) {
			for(var x = 0; x < raster.width; x++) {
				// Get the color of the pixel:
				var color = raster.getPixel(x, y);


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

		width = width*1.25;

		clarify(width);
	}
}

// graphics are drawn to Canvas when page loads
//canvas and raster defined. in draw canvas have constructor func.
function initialDraw(){
	DrawCanvas('myCanvas', 'starrynight');
}

initialDraw();

};
</script>