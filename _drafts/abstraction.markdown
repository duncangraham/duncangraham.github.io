
<canvas id="myCanvas2" width="671" height="50">
</canvas>

<script type="text/paperscript" canvas="myCanvas2">
// Create a raster item using the image tag with id='mona'
var raster = new Raster('starrynight');

// Hide the raster:
raster.visible = false;

// The size of our grid cells:
var gridSize = 20;

// Space the cells by 120%:
//var spacing = gridSize/10;

// As the web is asynchronous, we need to wait for the raster to load
// before we can perform any operation on its pixels.
raster.on('load', function() {
	// Since the example image we're using is much too large,
	// and therefore has way too many pixels, lets downsize it to
	// 40 pixels wide and 30 pixels high:
	raster.size = new Size(30, 1);

	var y = 0,
		x1 = 0,
		y1 = 0,
		x2 = 0 + gridSize,
		y2 = 0 + gridSize;


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

	// Move the active layer to the center of the view, so all 
	// the created paths in it appear centered.
	project.activeLayer.position = view.center;
});

// Move the active layer to the center of the view:
project.activeLayer.position = view.center;
</script>