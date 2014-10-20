---
layout: entry
title:  "Sport Team Relocations"
category: "experiment"
tag: experiment
date:   2014-03-09 10:08:00
---
<!-- Post specific styles -->
<style>
h1, .date, .info hr {
  display: none;
}

body article .info {
    margin: 0;
}

.site {
  font-size: .75em;
}

#relocations {
  position: relative;
  margin-top: -3em;
}

#relocations svg {
  padding-bottom: 2em;
}

.flexbox {
  margin: 3.5em 0em;
  padding: 1em;
}


#meta {
  position: absolute;
}

.d3-tip {
  line-height: 1;
  font-weight: bold;
  padding: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 2px;
}

.background {
  fill: none;
  pointer-events: all;
}

.state {
  fill: #CCC;
}

.state.locked, .state.locked:hover {
  fill:#AAA;
}

.state:hover {
  fill: #DDD;
}

#state-borders {
  fill: none;
  stroke: #fff;
  stroke-width: 1.5px;
  stroke-linejoin: round;
  stroke-linecap: round;
  pointer-events: none;
}

.space_big {
  margin: 2em 0em;
}

.hide {
  display: none;
}

circle {
  fill: #333;
}

rect {
  stroke:#FFF;
  stroke-width:1;
}

.arrow {
  fill: blue;
}

.link {
  fill: none;
  stroke: red;
  stroke-width: 1.5px;
  -webkit-transition: stroke-width .2s;
  -moz-transition: stroke-width .2s;
  -o-transition: stroke-width .2s;
  transition: stroke-width .2s;
}

.link:hover {
  stroke-width: 3px;
  cursor: none;
}

.link.nfl {
  stroke: #313AFF;
}

.link.nhl {
	stroke:#30DDB3;
}


.link.nfl {
  stroke: #313AFF;
}

.link.nba {
  stroke: #9224FF;
}

.link.mlb {
  stroke: #24A1FF;
}

.arrow.nhl {
	fill: #30DDB3;

}

.arrow.nfl {
  fill: #313AFF;
}

.arrow.nba {
  fill: #9224FF;
}

.arrow.mlb {
  fill: #24A1FF;
}

.block.nfl {
  fill: #313AFF;
}

.block.nba {
  fill: #9224FF;
}

.block.mlb {
  fill: #24A1FF;
}

.block.nhl {
	fill: #30DDB3;
}

.link.inactive {

}

#tooltip {
  position: absolute;
  background-color: #FFF;
  box-shadow: 0px 0px 2px #666;
  padding: 0em 1em;
  font-size: 0.8em;
  top:0;
  left: 0;
  display:none;
}

.label:hover, .state:hover {
  cursor: pointer;
}

.label.nfl {
  color: #313AFF;
}

.label.nba {
  color: #9224FF;
}

.label.mlb {
  color: #24A1FF;
}

.label.nhl {
  color:#30DDB3;
}

.axis {
  opacity: .3;
}

.axis path, .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
}

.filters {
  position: absolute;
  top: 3em;
  left:2em;
  width: 10em;
  z-index: 100;
}

.filters li {
  padding-bottom: 1em
}

.data {
  position: absolute;
  top: 3em;
  right:2em;
  width: 10em;
}

.data p {
	width: 10em;
	font-size: .875em;
  line-height: 1.714285714em;
}

.plane {
  -webkit-transform: rotate(90deg);
	-moz-transform: rotate(90deg);
	transform: rotate(90deg);
	position: relative;
	height: 2em;
 	top: 4.5em;
	left: 0em;
}

.stateList {
  position: absolute;
  top:0;
}

/* Not a fan of this. */
#Alaska, #Hawaii {
  display: none;
}

.state#DC {
  position: absolute;
  top:40%;
  right:23%;
  color:#CCC;
}

.nameChangeList {
	width: 50%;
  overflow: auto;
  text-align: center;
}
.nameChangeList li { float: left; width: 50%; }
.nameChangeList li:nth-child(odd) { clear: left; }

</style>
</article>
<ul class="filters">
  <li class="font-dark sort-opt">
    <h3 id="year" class="font-large">1900</h3>
  </li>
  <li class="sort-opt font-dark">
    <h3 class="label replay">REPLAY</h3>
  </li>
  <li class="sort-opt space-top">
    <h3 id="NFL" class="label nfl font-large" data-sport="nfl">NFL</h3>
  </li>
  <li class="sort-opt">
     <h3 id="NBA" class="label nba font-large" data-sport="nba">NBA</h3>
  </li>
  <li class="sort-opt">
    <h3 id="MLB" class="label mlb font-large" data-sport="mlb">MLB</h3>
  </li>
  <li class="sort-opt">
    <h3 id="NHL" class="label nhl font-large" data-sport="nhl">NHL</h3>
  </li>
</ul>

<ul class="stateList">
</ul>

<ul class="data">

</ul>

<div id="relocations"></div>
<article>
  <div class="space-top entry-content content-spacing">
    <p class="first-paragraph">Months ago I had an idea for a news service that would bring current events into perspective. For every big story, it would display similar threads from the past. My hope was that the context would cut down on sensationalism and better inform readers.</p>
    <p>During that time, the Washington Redskins were in the spotlight for their <a href="https://en.wikipedia.org/wiki/List_of_sports_team_names_and_mascots_derived_from_indigenous_peoples">controversial name</a>. With a newfound appreciation for history (I never really liked it in school), I started looking up historical sport team name changes. I found that many occurred during <a href="https://en.wikipedia.org/wiki/Relocation_of_professional_sports_teams">relocations</a>. The data looked interesting and I had wanted to learn D3 for a while, so I began coding in earnest.</p><p id="nameChanges">
      <ul class="nameChangeList font-small float-right"></ul>
    </p>
    <small class="font-small show-code center cursor-pointer space-bottom">
       20 teams (38% of all relocations) changed names!
    </small><p>As I worked with the data set, I started seeing patterns and stories. Some teams relocated multiple times, relocations happened within the same state, names changed (or didn't) for specific and fascinating reasons. Eventually, the context around the relocations interested me more than the original visualization.</p><p>At the time, the graphic showed the dataset, but offered no ways to explore it interactively. Without explicitly telling a story or allowing the audience to find stories for themselves, it was pretty lifeless.</p><p>Since everyone roots for different teams and enjoys different sports, I chose to be less explicit, letting the audience choose their own adventures. I hope you enjoy the graphic as much as I enjoyed making it. If you want to extend what I've already done, <a href="{{ root_path }}/json/relocations.json">here's the dataset</a>.</p>

<!-- <script src="{{ root_path }}/js/jquery.js"></script> -->
<script src="{{ root_path }}/js/d3.min.js" type="text/javascript"></script>
<script src="{{ root_path }}/js/topojson.v1.min.js" type="text/javascript" ></script>
<script>
var width =  document.body.offsetWidth || 960,
    height = width*.5,
    centered,
    projection = d3.geo.albersUsa()
                   .scale(width*.8)
                   .translate([width / 2, height / 2.25]),
    path = d3.geo
             .path()
             .projection(projection),
    svg = d3.select("#relocations")
            .append("svg")
            .attr("width", width)
            .attr("height", height),
    g = svg.append("g"),
    tooltip = $("#tooltip");

d3.json("/json/us.json", function(error, us) {
  g.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("class", "state")
      .attr("id", function(d) { return d.properties.name })
      .attr("d", path);

  $('#relocations').append('<div id="DC" class="lato state">DC</div>')

  g.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", path);


  d3.json("/json/relocations.json", function(error, data) {
      var m = data.migrations;

      var x = d3.time.scale()
                     .domain([new Date(1900, 7, 1), new Date(2014, 7, 1)])
                     .rangeRound([0, width*.8]);
      var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom')
                    .ticks(d3.time.years, 10)
                    .tickFormat(d3.time.format('%Y'))
                    .tickSize(4)
                    .tickPadding(8);

      svg.append('g')
        .attr('class', 'x axis lato')
        .attr('transform', 'translate(' + width/10 + ', ' + height + ')')
        .call(xAxis);

    svg.append("g").attr('id', 'departPoints')
      .selectAll('circle')
       .data(m)
       .enter()
        .append('circle')
        .attr('r', 2)
        .attr("transform", function(d) {return "translate(" + projection([d.left.coords[0],d.left.coords[1]]) + ")";});

    svg.append("g").attr('id', 'arrivePoints')
      .selectAll('circle')
       .data(m)
       .enter()
        .append('circle')
        .attr('r', 2)
        .attr("transform", function(d) {return "translate(" + projection([d.arrived.coords[0],d.arrived.coords[1]]) + ")";});



    var drawArcs = function () {
      $('#moves').remove();

      var groups = svg.append("g")
                      .attr('id', 'moves')
                      .selectAll("path")
                      .data(m)
                      .enter()
                      .append('g');
      var paths = groups.append("path")
                       .attr("d", function(d) {
                          var start = projection(d.left.coords),
                              end = projection(d.arrived.coords);

                          var dx = start[0] - end[0],
                              dy = start[1] - end[1],
                              dr = Math.sqrt(dx * dx + dy * dy);

                          return "M" + start[0] + "," + start[1] + "A" + dr + "," + dr + " 0 0,1 " + end[0] + "," + end[1];
                       })
                       .attr('class', function(d){
                        if( d.sport === 'NBA' ) {
                          return 'link nba move ' + d.left.state + ' ' + d.arrived.state
                        } else if ( d.sport === 'NFL' ) {
                          return 'link nfl move ' + d.left.state + ' ' + d.arrived.state
                        } else if ( d.sport === 'NHL' ) {
                          return 'link nhl move ' + d.left.state + ' ' + d.arrived.state
                        } else {
                          return 'link mlb move ' + d.left.state + ' ' + d.arrived.state
                        }
                       })
                       .on("mouseover", function(d){
                            $(this).parent().children().each(function(){
                              var classNames = this.getAttribute('class') + ' active';
                              this.setAttribute('class', classNames)
                            });

                            var tooltipInfo = '<li class="reloc-data">' +
                                              '<p class="center no-margin tk-effra">' + d.sport + ' | ' + d.year + '</p>' +
                                              '<p class="center no-margin tk-inconsolata space-top_mini">' + d.left.city + ' ' + d.left.name + '</p>' +
                                              '<p class="center no-margin plane"> ✈ </p>' +
                                              '<p class="center no-margin tk-inconsolata">' + d.arrived.city + ' ' + d.arrived.name + '</p>'
                                              + '<p class="space-top font-small center no-margin tk-inconsolata" style="font-size:.7em">' + d.notes + '</p></li>';


                            $('.data').append(tooltipInfo);

                            if( !locked ) {
                              $('.move').not( ".active" ).css({opacity: '.1'});
                            }
                       })
                       .on("mouseout", function(){
                            if( !locked ) {
                              $('.move').css({opacity: '1'});
                            }
                            $('.reloc-data').remove();
                            $(this).parent().children().each(function(){
                              var classNames = this.getAttribute('class');
                              classNames = classNames.substring(0, classNames.length - 7)
                              this.setAttribute('class', classNames)
                            });
                       })
                       .each(transition);

        groups.append("path")
         .attr('d', 'M 0,0 7,3.5 0,7 1.5,3.5 ')
         .attr('class', function(d){
          if( d.sport === 'NBA' ) {
            return 'arrow nba move ' + d.left.state + ' ' + d.arrived.state
          } else if ( d.sport === 'NFL' ) {
            return 'arrow nfl move ' + d.left.state + ' ' + d.arrived.state
          } else if ( d.sport === 'NHL' ) {
            return 'arrow nhl move ' + d.left.state + ' ' + d.arrived.state
          } else {
            return 'arrow mlb move ' + d.left.state + ' ' + d.arrived.state
          }
         })
         .attr('style', 'visibility: hidden')
         .attr("transform", function(d) {return "translate(" + projection([d.left.coords[0],d.left.coords[1]]) + ")";})
         .each(transitionArrows);


      function transition() {
        var totalLength = this.getTotalLength();
        d3.select(this).attr("stroke-dasharray", totalLength + " " + totalLength)
                       .attr("stroke-dashoffset", totalLength);
        d3.select(this).transition()
            .duration(1000)
            .delay(function(d,i) {
                return ((d.year-1900)*100);
            })
            .ease("ease-out")
            .attr("stroke-dashoffset", 0);
      }

     function transitionArrows () {
      d3.select(this).transition()
                     .duration(1000)
                     .ease("ease-out")
                     .delay(function(d,i) { return (( d.year-1900 )*100); })
                     .attrTween("transform", translateAlong )
                     .attr('style', 'visibility: visible');
     }

     // Returns an attrTween for translating along the specified path element.
     function translateAlong(pathNode) {
      var pathNode = this.parentNode.getElementsByTagName("path")[0];
      var l1 = pathNode.getTotalLength()-.01,
          l2 = pathNode.getTotalLength(),
          t0 = 0

      return function(t) {
           var p0 = pathNode.getPointAtLength(t0 * l1);//previous point
           var p = pathNode.getPointAtLength(t * l2);////current point
           var angle = Math.atan2(p.y - p0.y, p.x - p0.x) * 180 / Math.PI;//angle for tangent
           t0 = t;
           var centerX = p.x - 7,
               centerY = p.y - 3.5;
           return "translate(" + centerX + "," + centerY + ")rotate(" + angle + " 7" + " 3.5" +")";
      };
     }

      var yearHash = {};
      var rects = groups.append("rect")
                        .attr("x", function(d) {
                          var year = new Date(d.year, 1, 1);
                          return x(year)+width/10; })
                        .attr("width", "10px")
                        .attr("y", function(d) {
                          if( yearHash[d.year] > 0 ) {
                            yearHash[d.year] = yearHash[d.year]+1;
                          } else {
                            yearHash[d.year] = 1;
                          }
                          var yPos = 20*yearHash[d.year]+1;
                          return height-yPos;
                        })
                        .attr("height", "20px")
                        .attr("shape-rendering", "crispEdges")
                        .attr("class", function(d) {
                          if( d.sport === 'NBA' ) {
                            return 'move block nba ' + d.left.state + ' ' + d.arrived.state
                          } else if ( d.sport === 'NFL' ) {
                            return 'move block nfl ' + d.left.state + ' ' + d.arrived.state
                          } else if ( d.sport === 'NHL' ) {
                            return 'move block nhl ' + d.left.state + ' ' + d.arrived.state
                          } else {
                            return 'move block mlb ' + d.left.state + ' ' + d.arrived.state
                          }
                        })
                        .on("mouseover", function(d){
                          $(this).parent().children().each(function(){
                            var classNames = this.getAttribute('class') + ' active';
                            this.setAttribute('class', classNames)
                          });
                          var tooltipInfo = '<li class="reloc-data">' +
                                              '<p class="center no-margin tk-effra">' + d.sport + ' | ' + d.year + '</p>' +
                                              '<p class="center no-margin tk-inconsolata space-top_mini">' + d.left.city + ' ' + d.left.name + '</p>' +
                                              '<p class="center no-margin plane"> ✈ </p>' +
                                              '<p class="center no-margin tk-inconsolata">' + d.arrived.city + ' ' + d.arrived.name + '</p>'
                                              + '<p class="space-top font-small center no-margin tk-inconsolata" style="font-size:.7em">' + d.notes + '</p></li>';

                          $('.data').append(tooltipInfo);

                          if( !locked ) {
                            $('.move').not( ".active" ).css({opacity: '.1'});
                          }
                        })
                        .on("mouseout", function(){
                          if( !locked ) {
                            $('.move').css({opacity: '1'});
                          }

                          $('.reloc-data').remove();
                          $(this).parent().children().each(function(){
                            var classNames = this.getAttribute('class');
                            classNames = classNames.substring(0, classNames.length - 7)
                            this.setAttribute('class', classNames)
                          });

                        });


    }

     drawArcs();
      var year = 1900,
          yearDiv = $('#year'),
          dateCount = setInterval(function(){
                          year = year + 1;
                          yearDiv.html(year);

                          if (year == 2014) {
                            clearInterval(dateCount);
                          }
                        }, 100);

      $('.replay').on('click', function(){
        year = 1900;
        clearInterval(dateCount);
        dateCount = setInterval(function(){
                          year = year + 1;
                          yearDiv.html(year);

                          if (year == 2014) {
                            clearInterval(dateCount);
                          }
                        }, 100);
        drawArcs();
      });

      var departHash = {},
          arriveHash = {},
          leagueHash = {};

      $.each(m, function( i, v ) {
        if( departHash[v.left.state] > 0 ) {
          departHash[v.left.state] = departHash[v.left.state]+1;
        } else {
          departHash[v.left.state] = 1;
        }

        if( arriveHash[v.arrived.state] > 0 ) {
          arriveHash[v.arrived.state] = arriveHash[v.arrived.state]+1;
        } else {
          arriveHash[v.arrived.state] = 1;
        }

        if( leagueHash[v.sport] > 0 ) {
          leagueHash[v.sport] = leagueHash[v.sport]+1;
        } else {
          leagueHash[v.sport] = 1;
        }
      });

      var locked,
          lockType,
          stateName,
          leagueName;

      $('.label').on('click', function(){

          if( locked == leagueName ) {
            locked = null;
            lockType = null;

            $('.lock-text').html('click label to lock');
            $(this).removeClass('locked');
            $('.label').css('opacity', 1);

           } else {

            if ( lockType == 'state' ) {
              var prevLocked = document.getElementsByClassName("locked")[0];
              prevLocked.setAttribute("class", "state"); // removes locked class for other states
            } else if ( lockType == 'label' ) {
              $('.locked').removeClass('locked');
              $('.label').css('opacity', 1);
            }

            lockType = 'label';
            $(this).addClass('locked');

            $('.move').css('opacity', 1);
            $('.label').not('.locked').css('opacity', .1);
            labelHover( $(this) );

            locked = leagueName;
            $('.lock-text').html('click label to unlock');
           }
      });

      $('.label').hover(function(){
        leagueName = $(this).data('sport').toUpperCase();

        if ( !locked ) {
          labelHover( $(this) );
        }

      },function(){
        if( !locked ) {
          $('.move').css('opacity', 1);
          $('.data').html('');
        }
      });

      var labelHover = function( $this ) {

        var sport = $this.data('sport');
        $('.move').not('.' + sport).css('opacity', .1);

        var relocations = leagueHash[leagueName];

        var tooltipInfo = '<li class="space-bottom">' +
                          '<p class="center no-pad lato">' + leagueName + '</p>' +
                          '<p class="center no-pad tk-inconsolata space-top_mini">' + relocations + ' Relocations</p>' +
                          '<p class="center no-pad tk-inconsolata font-small lock-text">click label to lock</p></li>';

          $('.data').html(tooltipInfo);
      }

      $('.state').on('click', function(){
          if( locked == stateName ) {
            locked = null;
            lockType = null;
            $('.lock-text').html('click state to lock');
            this.setAttribute("class", "state lato");
            $('.move').css('opacity', 1); //neccessary?
           } else {
            //removes lock from another state
            if ( lockType == 'state' ) {
              var prevLocked = document.getElementsByClassName("locked")[0];
              prevLocked.setAttribute("class", "state"); // removes locked class for other states
            } else if ( lockType == 'label' ) {
              $('.locked').removeClass('locked');
              $('.label').css('opacity', 1);
            }

            this.setAttribute("class", "state locked lato");
            locked = stateName;
            lockType = 'state';
            $('.move').css('opacity', 1);
            hoverFunction( $(this) );
            $('.lock-text').html('click state to unlock');
           }
      });

      $('.state').hover(function() {
        stateName = $(this).attr('id');

        if( !locked ) {
          hoverFunction( $(this) );
        }
      }, function() {
        if( !locked ) {
          $('.move').css('opacity', 1);
          $('.data').html('');
        }
      });

      var hoverFunction = function($this) {
          var arrivals = (arriveHash[stateName]) ? arriveHash[stateName] : 0,
              departures = (departHash[stateName]) ? departHash[stateName] : 0,
              sliceStart = stateName.indexOf(' ');

          if ( sliceStart > 0 ) {
            var splitState = stateName.split(' ');
            $('.move').not('.'+splitState[0]+'.'+splitState[1]).css('opacity', .1);
          } else {
              $('.move').not('.'+stateName).css('opacity', .1);
          }

           var tooltipInfo = '<li class="space-bottom">' +
                             '<p class="center bold no-margin tk-effra">' + stateName + '</p>' +
                             '<p class="center no-margin tk-inconsolata space-top_mini">' + arrivals + ' Arrivals</p>' +
                             '<p class="center no-margin tk-inconsolata">'+ departures +' Departures</p>'+
                             '<p class="center no-margin tk-inconsolata font-small lock-text">click state to lock</p></li>';

            $('.data').html(tooltipInfo);
      };


    //name changes
    var nameHash = [{'name': 'noChange', 'value': 32}, {'name': 'change', 'value': 20}],
        nameList = [];

    var radius = Math.min(width, height) / 6;
    var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

    var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.value; });

    var pieSvg = d3.select("#nameChanges").append("svg")
                 .attr("width", "12em")
                 .attr("height", '16em')
                 .append("g")
                 .attr("transform", "translate(" + radius + "," + height / 4 + ")");


    var g = pieSvg.selectAll(".arc")
                .data(pie(nameHash))
              .enter().append("g")
                .attr("class", "arc");

        g.append("path")
         .attr("d", arc)
         .style("fill", function(d){

                  if ( d.data.name == 'noChange' ) {
                    return '#CCC';
                  } else {
                    return '#0074D9';
                  }
                });

    $.each(m, function( i, v ){
      if ( v.left.name !== v.arrived.name ) {
        var nameChangeString = v.left.name + ' → ' + v.arrived.name;
        nameList.push(nameChangeString);

        $('.nameChangeList').append('<li>' + nameChangeString + '</li>');
      }
    });

  });

});
</script>



<!--
footnotes

things that helped
what's .data()? http://stackoverflow.com/questions/9481497/understanding-how-d3-js-binds-data-to-nodes

https://github.com/mbostock/d3/wiki/Geo-Paths
http://bl.ocks.org/enoex/6201948
https://groups.google.com/forum/#!topic/d3-js/MLZX1AbS7-Y
http://fiddle.jshell.net/RnNsE/2/
https://groups.google.com/forum/#!topic/d3-js/kxMRr-CzZkY

-->
