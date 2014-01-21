---
layout: post
title:  "abstracting classics"
type: "experiment"
date:   2014-01-10 13:47:00
---
<!-- Post Content -->
<style>
	canvas:hover {
		cursor: cell;
	}

	#mycursor {
		position: absolute;
		background-color: blue;
		color:white;
		font-size: .9em;
		padding: 0em 1em;
		display: none;
	}
</style>

<div id="mycursor" class="tk-inconsolata">click to clarify</div>

<p class="first-paragraph">
During the past few months, I've become increasingly interested in digital art. Glitch, visualizations, pixels... it's all very exciting, and I've wanted to dive in myself. <a href="/glitch.html">I wasn't making anything I was happy with though.</a>

A week ago I saw <a href="http://work.heinley.com/pixels#asset-656032">"Nightpix" by BJ Heinley</a> and was inspired to recreate more timeless works with code.
</p>

<p>
	As I progressed, I found myself tweaking the level of abstraction so much, I decided to change the initial purpose of the experiment. Below are highly abstracted famous works of art. Clicking them will bring you closer and closer to the original. The experience is a bit like putting on glasses for the first time and realizing that before you couldn't see the leaves on the trees.
</p>

<script type="text/javascript" src="{{ root_path }}/js/paper-full.js"></script>

<canvas id="myCanvas1" width="671" height="600"></canvas>
<img style="display:none" src="{{ root_path }}/img/starrynight.jpg" id="starrynight"/>

<canvas id="myCanvas2" width="671" height="600"></canvas>
<img style="display:none" src="{{ root_path }}/img/david.jpg" id="david"/>

<canvas id="myCanvas3" width="671" height="600"></canvas>
<img style="display:none" src="{{ root_path }}/img/greatwave.jpg" id="greatwave"/>

<canvas id="myCanvas4" width="671" height="600"></canvas>
<img style="display:none" src="{{ root_path }}/img/creationofadam.jpg" id="creationofadam"/>

<p>this last one is for my dad. Sorry if you can't guess it! (<a href="http://online.wsj.com/news/articles/SB10001424052748704584804575644900237353756">and here's an article on the painting and the artist.</a>)</p>
<canvas id="myCanvas6" width="671" height="600"></canvas>
<img style="display:none" src="{{ root_path }}/img/dad.jpg" id="dad"/>


<p>last but not least. <a href="https://en.wikipedia.org/wiki/Ren%C3%A9_Magritte">One of my favorite artists</a>, and my favorite result of the experiment. I think a few of the frames hit the same type of beauty Nightpix captured.</p>
<canvas id="myCanvas5" width="671" height="600"></canvas>
<img style="display:none" src="{{ root_path }}/img/sonofman.jpg" id="sonofman"/>

<p>I'm currently turning this into a game. If you want to collaborate, shoot me an email: hello@dvncan.com or hit me up on twitter <a href="https://twitter.com/duncangraham">@duncangraham</a></p>

<script type="text/javascript">

window.onload = function() {


var setupCanvas = function (canvasName, rasterName) {
	var myPaper = new paper.PaperScope();
	var canvas = document.getElementById(canvasName);
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	paper.project.activeLayer.removeChildren();
		
	var size = 2,
		rastRatio,
		paths = [];

	var clarify = function(rasterName, size, rastRatio) {
		paths = [];
		paper.project.activeLayer.removeChildren();

		var raster =  new paper.Raster(rasterName),
			w,
			h,
			gridSize;

		// Hide the raster:
		raster.visible = false;

		// As the web is asynchronous, we need to wait for the raster to load
		// before we can perform any operation on its pixels.
		raster.on('load', function() {
			// Since the example image we're using is much too large,
			// and therefore has way too many pixels, lets downsize it to
			// 40 pixels wide and 30 pixels high:

			//the max width is always 671


			if ( raster.height > raster.width ) {
				rastRatio = raster.width/raster.height;
				orientation = 'portrait';
				h = size,
				w = h*rastRatio,
				gridSize = (canvas.height)/h;
			} else {
			    rastRatio = raster.height/raster.width;
			    orientation = 'landscape';
			   	w = size,
				h = w*rastRatio,
				gridSize = (canvas.width)/w;
			}	

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

			// Move the active layer to the center of the view, so all 
			// the created paths in it appear centered.
			paper.project.activeLayer.position = paper.view.center;

		});

	};

	paper.tool.onMouseDown = function(event) {
		size = size*1.25;
		clarify(rasterName, size, rastRatio);
	};

	//draw things!
	clarify(rasterName, size, rastRatio);
	paper.view.draw();
}

function initialDraw() {
	setupCanvas('myCanvas1', 'starrynight');
	setupCanvas('myCanvas2', 'david');
	setupCanvas('myCanvas3', 'greatwave');
	setupCanvas('myCanvas4', 'creationofadam');
	setupCanvas('myCanvas5', 'sonofman');
	setupCanvas('myCanvas6', 'dad');
};

initialDraw();

var cursor = document.getElementById("mycursor");
$('canvas').hover(function(){
	$('canvas').mousemove(function(e){
		cursor.style.display = 'block';
		cursor.style.top = e.pageY*1 + 5 + "px";
	    cursor.style.left = e.pageX*1 + 5 + "px";
	});	
},function(){
	cursor.style.display = 'none';
});


}; // end window.onload
</script>