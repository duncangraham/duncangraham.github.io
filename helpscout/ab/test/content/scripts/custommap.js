function MapHelper(mapData) {
    this.map = L.map("project-map", { minZoom: 1 });
    L.control.fullscreen().addTo(this.map);
    this.rawData = mapData;

    var markers;
    var filteredData;
    var searchTimer;
}

var USE_MY_LOCATION = false;
var projectMap;

function slider_onSlide(event, ui) {
    var min = $("#project-budget-slider-control").slider("values", 0);
    var max = $("#project-budget-slider-control").slider("values", 1);
    var minDisplay = formatBudgetDisplay(min);
    var maxDisplay = formatBudgetDisplay(max);
    $("#project-budget-min").val(min);
    $("#project-budget-max").val(max);

    if (max === 1000) {
        maxDisplay += "+";
        $("#project-budget-max").val(999999);
    }
    $("#project-budget-slider").val(minDisplay + " - " + maxDisplay);
}

function slider_onChange() {
    clearInterval(projectMap.searchTimer);  //clear any interval on key up
    projectMap.searchTimer = setTimeout(function () { //then give it a second to see if the user is finished
        //do .post ajax request //then do the ajax call
        $("#project-budget-min").change();
    }, 2000);
}

$(document).ready(function () {
    $("#project-budget-slider-control").slider({
        range: true,
        min: 5,
        max: 1000,
        step: 5,
        values: [5, 1000],
        slide: slider_onSlide,
        change: slider_onChange
    });

    var sliderMin = $("#project-budget-slider-control").slider("values", 0);
    var sliderMax = $("#project-budget-slider-control").slider("values", 1);
    $("#project-budget-slider").val(formatBudgetDisplay(sliderMin) + " - " + formatBudgetDisplay(sliderMax) + "+");
    $("#project-budget-min").val(sliderMin);
    $("#project-budget-max").val(999999);

    
    var projectData;


            projectData = datasource

            //Get Total Value of Projects
            var totalValue = Enumerable.From(projectData).Sum("parseFloat($.properties.budget)");
            $("#project-total-value").text(formatBudgetDisplay(totalValue));

            projectMap = new MapHelper(projectData);
            projectMap.initialize().updateMapData().resetMapView();

            $('#project-map-filter :input').change(function () {
                if (!$(this).attr("placeholder")) { //ignore placeholder for changes as these are the magic controls and they have a custom onchange event
                    projectMap.updateMapData();
                }
            });

            for (var key in projectMap.magicControls) {
                $(projectMap.magicControls[key]).on('selectionchange', function (e, m) {
                    projectMap.updateMapData();
                });
            }

            $('#project-map-button,#project-map-pill').click(function () {
                $('#project-map-section').removeClass('offscreen');
                $('#project-table-section').addClass('offscreen');
                $('#project-table').addClass('hidden');

                var $map = $('#project-map-section .map');
                projectMap.resetMapView();
                $('#project-table-pill').removeClass('active');
                $('#project-map-pill').addClass('active');
            });

            $('#project-table-button,#project-view-list,#project-table-pill').click(function () {
                $('#project-table-section').removeClass('offscreen');
                $('#project-table').removeClass('hidden');
                $('#project-map-section').addClass('offscreen');

                var $map = $('#project-map-section .map');

                $('#project-map-pill').removeClass('active');
                $('#project-table-pill').addClass('active');
            });

            

            projectMap.resetMapView();

            var url = document.location.toString();

            projectMap.map.on('popupopen', function (e) {
                if ($(window).width() <= 1024) {
                    e.popup._close(); //close the hidden popup
                    showProjectDetailsModal(e.popup._content);
                }

                //this section should fix the chrome issue where the popup doesn't show up in full view on the first click in chrome
                var px = this.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
                px.y -= e.popup._container.clientHeight / 2 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
                this.panTo(this.unproject(px), { animate: true }); // pan to new center
            });

            function showProjectDetailsModal(popupHtml) {
                if (popupHtml != null) {
                    var title = popupHtml.split('</a>')[0] + "</a>";
                    title = title.replace('<h1>', '').replace('</h1>', '');

                    var body = popupHtml.split('</a>')[1];
                    var detailURL = title.split("'")[1];
                    var footer = "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";

                    $('#modal-title').html(title);
                    $('#modal-body').html(body);
                    $('#modal-footer').html(footer);
                }
                else {
                    $('#modal-title').html("Not Available");
                    $('#modal-body').html("The details for this project are not available at this time.");
                }

                $("#modal-project-details").modal('show');
            }

            $(window).resize(function () {
                setTimeout(function () {
                    projectMap.resetMapView();

                    $('#twitter-timeline-div iframe').width($('#project-map-twitter').width());
                }
                , 500);
            });

            //Resize twitter widget
            setTimeout(function() {
                $('#twitter-timeline-div iframe').width($('#project-map-twitter').width());
            }, 1000);

            $('a.follow-button profile').text('Follow Me');

            if (!Modernizr.geolocation) {
                //current location not available
                $("#zoomToCurrentLocationLink").hide();
            } else {
                $("#zoomToCurrentLocationLink").show();
                $(".leaflet-control-fullscreen.leaflet-bar.leaflet-control").after("<div class='leaflet-control-location leaflet-bar leaflet-control'><a id='zoomToCurrentLocationLinkMapButton' class='fa fa-location-arrow' title='Use my current location' href='#'></a></div>");
                $("#zoomToCurrentLocationLink,#zoomToCurrentLocationLinkMapButton").click(function (e) {
                    e.preventDefault();
                    navigator.geolocation.getCurrentPosition(function (position) {
                        USE_MY_LOCATION = true;
                        projectMap.zoom(position.coords.latitude, position.coords.longitude);
                    });
                });
            }

            // If custommap_routing.js is included, apply the url pattern routing
            if (ApplyRouting) {
                ApplyRouting(projectMap.magicControls, projectMap);
            }

});

MapHelper.prototype.resetMapView = function () {
    var $map = $('#project-map');
    var height = $map.height();
    var width = $map.width();

    if (height >= 400)
        height = width * 0.75;
    else
        height = width;


    $map.height(height);
    if (!USE_MY_LOCATION) // this is a hack for when the "permission to use location" causes a window resize
    {
        this.map.fitBounds(this.markers.getBounds(), { padding: [70, 70] });
    }
    USE_MY_LOCATION = false;
    this.map.invalidateSize();


    return this;
}


MapHelper.prototype.updateMapData = function () {
    this.filteredData = Enumerable.From(this.rawData)
            //.Distinct("$.properties.name")
            .ToArray();

    this.filterByMagic("municipality", this.municipalityMagic)
        .filterByMagic("sector", this.sectorMagic)
        .filterByMagic("stage", this.stageMagic)
        //.filterByStringProperty("stage")
        .filterBudget()
        .filterByRecentlyAdded();
    $("#project-filter-count").text(this.filteredData.length);

    this.buildTable().buildLegend().renderMap();
    return this;
}


MapHelper.prototype.buildLegend = function () {
    var legendHtmlOutput = "";
    if (this.filteredData.length > 0) {
        //WE SHOULD USE MUSTACHE OR HANDLEBARJS for this templating.
        var data = Enumerable.From(this.filteredData)
			.OrderBy("$.properties.sector")
			.Distinct("$.properties.sector")
			.Select(function (x) { return { name: x.properties.sector, color: x.properties.color } })
			.ToArray();

        legendHtmlOutput += "<div class='row'><div class='col-xs-12'><div class='row'>";
        $(data).each(function (index, sector) {
            legendHtmlOutput += "<div class='col-sm-6 col-md-4 legend-item' title='" + sector.name + "' data-value='" + sector.name + "'>"
                + "<span class='legend-item-color' style='background-color:" + sector.color + ";'>&nbsp;</span>"
                + sector.name
                + "</div>";
        });
        legendHtmlOutput += "</div></div></div>";

    }

    $('#project-map-legend').html(legendHtmlOutput);

    return this;
}

MapHelper.prototype.buildTable = function () {
    var listHtmlOutput = "";
    var rdata = this.rawData;
    if (this.filteredData.length > 0) {
        //WE SHOULD USE MUSTACHE OR HANDLEBARJS for this templating.
        var fdata = this.filteredData;
        $(this.filteredData).each(function (index, element) {
            var budgetDisplay = "TBD";
            var budgetSort = "";
            var stageSort = "99";
            var mapIcon = "";

            if (element.properties.budget != null) {
                budgetDisplay = formatBudgetDisplay(element.properties.budget);
                budgetSort = element.properties.budget;
            }

            if (element.properties.stage != null) {
                stageSort = (MAJOR_PROJECTS_STAGES[element.properties.stage.toUpperCase()] != null) ? MAJOR_PROJECTS_STAGES[element.properties.stage.toUpperCase()] : "99";
            }

            listHtmlOutput += "<tr class='result-item'>"
                + "<td data-th='Name' data-value='" + element.properties.name + "'>" + mapIcon + "<a href='/details/" + element.properties.friendlyName + "' target='_blank'>" + element.properties.name + "</a></td>"
                + "<td data-th='Municipality'>" + ((element.properties.toMunicipality != null) ? element.properties.municipality + " to " + element.properties.toMunicipality : element.properties.municipality) + "</td>"
                + "<td data-th='Sector'>" + element.properties.sector + "</td>"
                + "<td class='text-center' data-th='Budget' data-value='" + budgetSort + "'>" + budgetDisplay + "</td>"
                + "<td data-th='Project Stage' data-value='" + stageSort + "'>" + element.properties.stage + "</td>"
                + "<td class='text-center' data-th='Schedule'>" + element.properties.schedule + "</td>"
                + "</tr>";
        });
    }
    $('#project-table tbody').html(listHtmlOutput);
    $('#project-table').trigger('update');
    return this;
}

MapHelper.prototype.filterByStringProperty = function (propertyName) {
    var val = $("#project-" + propertyName).val();
    if (val.toLowerCase() != "all") {
        var results = Enumerable.From(this.filteredData)
			.Where("$.properties." + propertyName + " == '" + val + "'")
			.ToArray();

        this.filteredData = results;
    }
    return this;
}

MapHelper.prototype.filterByMagic = function (propertyName) {
    var value = this.magicControls[propertyName].getValue();
    var length = value.length;
    if (length != 0) {
        var whereClause = "";
        for (var i = 0; i < length; i++) {
            var val = value[i];
            if (whereClause != "") {
                whereClause = whereClause + " || ";
            }
            if (propertyName == "municipality") {
                whereClause = whereClause + "($.properties.municipality == '" + val + "' || $.properties.toMunicipality == '" + val + "')";
            }
            else {
                whereClause = whereClause + "($.properties." + propertyName + " == '" + val + "')";
            }
        }
        var results = Enumerable.From(this.filteredData)
            .Where(whereClause)
            .ToArray();
        this.filteredData = results;
    }
    return this;
}

MapHelper.prototype.filterByRecentlyAdded = function () {
    var val = $("#project-recently-added").is(':checked');
    if (val) {
            var results = Enumerable.From(this.filteredData)
                .Where("$.properties.recentlyAdded == true")
                .ToArray();

            this.filteredData = results;
    }
    return this;
}

MapHelper.prototype.filterBudget = function () {

    var min = $("#project-budget-min").val();
    var max = $("#project-budget-max").val();

    var results = Enumerable.From(this.filteredData)
	.Where(function (x) {
	    if (x.properties.budget != null) {
	        var budget = parseFloat(x.properties.budget);
	        return (budget >= min) && (budget <= max);
		}
	}).ToArray();

    this.filteredData = results;

    //Get Sum value of filtered projects
    var sum = Enumerable.From(this.filteredData).Sum("parseFloat($.properties.budget)");
    $("#project-filter-value").text(formatBudgetDisplay(sum));

    return this;
}

function pushItemToBottomOfArray(array, itemValue) {
    var itemIndex = $.inArray(itemValue, array);
    
    if (itemIndex > -1) {
        array.splice(itemIndex, 1)
        array.push(itemValue);
    }

    return array;
}


MapHelper.prototype.generateMagicOptionsFor = function (propertyName, orderbyName) {
    if (!orderbyName) {
        orderbyName = propertyName;
    }
    var distinctValues = Enumerable.From(this.rawData)
	.OrderBy("$.properties." + orderbyName)
    .Select("$.properties." + propertyName)
	.Distinct()
    .ToArray();

    if (propertyName == "sector") {
        distinctValues = pushItemToBottomOfArray(distinctValues, "Other Sectors");
    }

    this.magicControls[propertyName] = $("#project-" + propertyName).magicSuggest({
        data: distinctValues,
        allowFreeEntries: false,
        placeholder: "All"
    });

    return this;
}

function buildPopupContent(feature) {

    var imageHtml = "";
    var siteurl = document.location.toString();

    var prefix = "http://projects.alberta.ca/images/albertaprojects/";
    var adjustedPrefix = prefix;

    var uatUrl = "http://vm-internet-6f:8003";
    var devUrl = "http://vm-internet-5f:8003";

    var index = siteurl.indexOf(uatUrl); //UAT check
    if (index >= 0) {
        adjustedPrefix = uatUrl + "/images/albertaprojects/";
    }

    index = siteurl.indexOf(devUrl); //DEV check
    if (index >= 0) {
        adjustedPrefix = devUrl + "/images/albertaprojects/";
    }

    if (feature.properties.image != null) {
        //if we have no image, show the default image

        var imagePathTrimmed = feature.properties.image.replace(prefix, "");
        var imagePathEncoded = encodeURIComponent(imagePathTrimmed).replace(/'/g, "%27");
        var fullImagePath = adjustedPrefix + imagePathEncoded;
        imageHtml = "<img class='responsive popup-image' src='" + fullImagePath + "'>";
    }

    var budgetDisplay = formatBudgetDisplay(feature.properties.budget);


    var popup = "<a href='/details/" + feature.properties.friendlyName + "' target='_blank'>"
        + "<h1>" + feature.properties.name + "</h1>"
        + imageHtml
        + "</a>"
        + "<table class='table table-condensed table-striped table-hover'>"
        + "<tbody>"
        + "<tr>"
        + "<td class='map-popup-label'>MUNICIPALITY:</td>"
        + "<td>" + ((feature.properties.municipality != null) ? ((feature.properties.toMunicipality != null) ? feature.properties.municipality + " to " + feature.properties.toMunicipality : feature.properties.municipality) : tbdText) + "</td>"
        + "</tr>"
        + "<tr>"
        + "<td class='map-popup-label'>SECTOR:</td>"
        + "<td>" + feature.properties.sector + "</td>"
        + "</tr>"
        + "<tr>"
        + "<td class='map-popup-label'>BUDGET:</td>"
        + "<td>" + budgetDisplay + "</td>"
        + "</tr>"
        + "<tr>"
        + "<td class='map-popup-label'>SCHEDULE:</td>"
        + "<td>" + feature.properties.schedule + "</td>"
        + "</tr>"
        + "</tbody>"
        + "</table>"
        + "<p><a class='btn' href='/details/" + feature.properties.friendlyName + "' target='_blank'>More Details<i class='fa fa-angle-right'></i></a></p>";
    return popup;
}


MapHelper.prototype.onEachFeature = function (feature, layer) {
    if (feature.properties) {
        var popupContent = buildPopupContent(feature);
        layer.bindPopup(popupContent);
    }
}

MapHelper.prototype.pointToLayer = function (feature, latlng) {
    var markerSize = "m";
    var budget = feature.properties.budget;
    if (budget != null) {
        if (budget < 10) {
            markerSize = "s";
        } else if (budget >= 10 && budget <= 100) {
            markerSize = "m";
        } else {
            markerSize = "l";
        }
    }
    var icon = L.MakiMarkers.icon({
        icon: null, color: feature.properties.color, size: markerSize
    });
    return L.marker(latlng, { icon: icon});
}

MapHelper.prototype.initialize = function () {
    
    this.map.setView([53.5501400, -113.4687100], 9);

    //if ($("html").hasClass("lt-ie9")) {
        //L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        //}).addTo(this.map);
    //} else {
        L.mapbox.accessToken = 'pk.eyJ1IjoiZWFld2VidGVhbSIsImEiOiJDRDZCM0dNIn0.F_vK4KbOx7aTmFtaHaGgwQ';
        var layers = {
            Streets: L.mapbox.tileLayer('eaewebteam.kp9gk5oi'),
            Satellite: L.mapbox.tileLayer('eaewebteam.kpa5epio')
        };
        layers.Streets.addTo(this.map);
        L.control.layers(layers).addTo(this.map);
    //}
    this.mapLayerGroups = [];
    this.magicControls = {};
    this.generateMagicOptionsFor("municipality").generateMagicOptionsFor("sector").generateMagicOptionsFor("stage", "stageSort");
    
    var projects = Enumerable.From(this.rawData)
	.OrderBy("$.properties.name")
    .Select("{id:$.properties.friendlyName, name:$.properties.name}")
    .ToArray();

    $($("#project-name").magicSuggest({
        data: projects,
        allowFreeEntries: false,
        hideTrigger: true,
        maxSelection: 1,
        noSuggestionText: "",
        placeholder: "Search Projects by Name"
    })).on('selectionchange', function (e, m) {
        var value = this.getValue();
        if (value && value != '') {
            this.clear();
            window.open('/details/' + value,'_blank');
        }
    });
    
    //Initialize the TableSorter once and only once. Subsequent calls should call 'update'
    $('#project-table').tablesorter({
        headers: {
            3: { sorter: 'digit' }
        },
        textExtraction: function (node) {
            var cell_value = $(node).text();
            var sort_value = $(node).data('value');
            return (sort_value != undefined) ? sort_value : cell_value;
        }
    });

    var distinctData = Enumerable.From(this.rawData)
		.ToArray();

    //Set the record count
    $('#project-count, #project-filter-count').text(distinctData.length);
    
    return this;
}

MapHelper.prototype.renderMap = function () {
    if (!this.map) {
        this.initialize();
    }

    if (this.markers === undefined) {
        this.markers = L.markerClusterGroup({ maxClusterRadius: 35 });
    }
    this.markers.clearLayers();

    if (this.filteredData.length > 0) {

        //var dataWithLocation = Enumerable.From(this.filteredData).Where("$.geometry.coordinates[0] != 0").ToArray();
        var dataWithLocation = Enumerable.From(this.filteredData).Where("$.geometry.coordinates != null").ToArray();
        if (dataWithLocation.length > 0) {
            geoJsonLayer = L.geoJson(dataWithLocation, {
                onEachFeature: this.onEachFeature,
                pointToLayer: this.pointToLayer,
                style: this.style
                }
			);

            this.markers.addLayer(geoJsonLayer);
            this.map.addLayer(this.markers);
            this.map.fitBounds(this.markers.getBounds(), { padding: [70, 70] });
        }
        else {
            //Used to re-focus on all of alberta when there are no values.
            this.map.setView([53.5501400, -113.4687100], 6);
        }
    } else {
        //Used to re-focus on all of alberta when there are no values.
        this.map.setView([53.5501400, -113.4687100], 6);
    }

    return this;
}

MapHelper.prototype.style = function (feature) {
    if (feature.geometry && feature.geometry.type != "Point") {
        if ($('#is-xs,#is-sm,#is-md').is(":visible")) {
            return {
                color: feature.properties.color,
                weight: 10,
                dashArray: '12',
                opacity: 0.7,
                lineCap: 'round'
            };
        }

        return {
            color: feature.properties.color,
            weight: 5,
            dashArray: '10',
            linecap: 'round',
            opacity: 0.7,
            smoothFactor: 1
        };
        
    } else {
        if ($('#is-xs,#is-sm,#is-md').is(":visible")) {
            return {
                color: '#05ae40',
                weight: 10,
                dashArray: '12',
                opacity: 0.7,
                lineCap: 'round'
            };
        }

        return {
            color: '#05ae40',
            weight: 5,
            dashArray: '10',
            linecap: 'round',
            opacity: 0.7,
            smoothFactor: 1
        };
    }
}

MapHelper.prototype.zoom = function (latitude, longitude, zoomLevel) {
    if (! zoomLevel)
        zoomLevel = 13;
    this.map.setView([latitude, longitude], zoomLevel);
}

function formatBudgetDisplay(budget) {

    var budgetDisplay = "TBD";

    if (budget != null) {
        if (parseFloat(budget).toFixed(0).length >= 4)
            budgetDisplay = "$" + (parseFloat(budget) / 1000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "B";
        else
            budgetDisplay = "$" + parseFloat(budget).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "M";

    }
    return budgetDisplay;
}
