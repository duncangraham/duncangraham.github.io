
var map;
var geoJsonLayer;
var markers; 
var currentFeature;

var tbdText = "";

$( document ).ready(function() {
    //var id = getQueryVariable('id'); 
    var id = getID('id');

    var feature;
    $.ajax({
        url: '/api/MajorProjects/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (id != data.properties.friendlyName) {
                window.location = "/details/" + data.properties.friendlyName;
                return;
            }

            currentFeature = data;
            if (currentFeature != undefined) {
                $('#project-name').html(currentFeature.properties.name);

                var imageHtml = "";
                
                if (currentFeature.properties.imageFileName != null) {
                    imageHtml = "<img class='responsive' src='" + currentFeature.properties.imageFileName + "'>";
                    if (currentFeature.properties.imageSource != null) {
                        imageHtml += "<div>" + currentFeature.properties.imageSource + "</div>";
                    }
                }

                $('#project-image').html(imageHtml);

                if (currentFeature.properties.details != null) {
                    $('#description-text').html(currentFeature.properties.details);
                    $('#project-description-header').show();
                } else {
                    $('#project-description-header, #description-text').hide();
                }

                var title = currentFeature.properties.name.replace(/'|_|"/g, '');
                document.title = title + " | Alberta Major Projects";
                $('#metaTitle').attr("content", title + " | Alberta Major Projects");


                $('#metaDescription').attr("content", title);
                $('#metaDcDescription').attr("content", title);

                writeProjectFeatureDetails(currentFeature);

                //Hide lat lon of 0
                var dataWithLocation = Enumerable.From(this.filteredData).Where("$.geometry.coordinates[0] != 0").ToArray();
                if (currentFeature.geometry.coordinates[0] == 0) {
                    $('#map').addClass("hidden");
                    $('#view-marker').addClass("hidden");
                }

                createMap();
                initMap();
                
            }
            else {
                /* show the details not found section*/
                $('#content-details').addClass('hidden');
                $('#project-name').html("Details Unavailable");
                $('#content-information').html("Oops, the details for this project could not be found. Please try again.");
                $('#content-information').removeClass('hidden');


            }
        },
        error: function (x, y, z) {
            //todo: handle error
            //alert(x + '\n' + y + '\n' + z);
        }
    });
        
	
		
	$( "#view-marker" ).click(function() {
		setMarkerInView();
	});
	
	$('.link').tooltip();

});


$.urlParam = function (name) {
    var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || 0;
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
};

function getID() {

    return window.location.pathname.split("/").slice(-1)[0];

};


function writeProjectFeatureDetails(feature)
{
	var listHtmlOutput = "";

	var stageDescription = (MAJOR_PROJECTS_STAGE_DESCRIPTIONS[feature.properties.stage.toUpperCase()] != undefined) ? MAJOR_PROJECTS_STAGE_DESCRIPTIONS[feature.properties.stage.toUpperCase()] : "Information not available";
	
	var budgetDisplay = formatBudgetDisplay(feature.properties.budget);


	var locationFromToDispay = "";
//	if (feature.properties.municipality.fromLocation != null && feature.properties.municipality.toLocation) {
//	    locationFromToDispay += "<tr>"
//            + "<td class='map-detail-label'>FROM/TO MUNICIPALITY: </td>"
//            + "<td>" + feature.properties.municipality.fromLocation + " to " +  feature.properties.municipality.toLocation + "</td>"
//            + "</tr>";
//	}

	listHtmlOutput +="<tr>"
		+ "<td class='map-detail-label'>MUNICIPALITY: </td>"
			+ "<td>" + ((feature.properties.municipality != null) ? ((feature.properties.toMunicipality != null) ? feature.properties.municipality + " to " + feature.properties.toMunicipality : feature.properties.municipality) : tbdText) + "</td>"
				+ "</tr>"
                + locationFromToDispay
					+ "<tr>"	
						+ "<td class='map-detail-label'>SECTOR:</td>"
					+ "<td>" + feature.properties.sector + "</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td class='map-detail-label'>SCHEDULE: </td>"
					+ "<td>" + feature.properties.schedule + "</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td class='map-detail-label'>BUDGET: </td>"
					+ "<td>" + budgetDisplay + "</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td class='map-detail-label'>STAGE: </td>"
						+ "<td><div class='link hover-description' data-original-title='" + stageDescription + "'  data-container='body' data-toggle='tooltip' data-placement='top'>" + ((feature.properties.stage != null) ?  feature.properties.stage : tbdText) + "</div></td>"
					+ "</tr>"
					
						if (feature.properties.developer != null) {
						    listHtmlOutput += "<tr>"
						        + "<td class='map-detail-label'>DEVELOPER: </td>"
						        + "<td>" + feature.properties.developer + "</td>"
						        + "</tr>";
						}
						if (feature.properties.constructionContractor != null) {
						    listHtmlOutput += "<tr>"
						        + "<td class='map-detail-label'>CONTRACTOR: </td>"
						        + "<td>" + feature.properties.constructionContractor + "</td>"
						        + "</tr>";
						}
						if (feature.properties.architect != null) {
						    listHtmlOutput +=
						        + "<tr>"
						        + "<td class='map-detail-label'>ARCHITECT: </td>"
						        + "<td>" + feature.properties.architect + "</td>"
						        + "</tr>";
						}
						if (feature.properties.projectNotes != null)
						{
							listHtmlOutput += "<tr>"
							+ "<td class='map-detail-label'>PROJECT NOTES: </td>"
							+ "<td>" + feature.properties.projectNotes + "</td>"
							+ "</tr>";		
						}
						if (feature.properties.website != null) {

						    var websiteList = feature.properties.website;
						    var websiteArray = null;

						    if (websiteList.toLowerCase().indexOf(" or ") >= 0) {
						        websiteArray = websiteList.split(" or ");
						    }
						    else if (websiteList.toLowerCase().indexOf(" and ") >= 0) {
						        websiteArray = websiteList.split(" and ");

						    }
						    else if (websiteList.toLowerCase().indexOf(",") >= 0) {
						        websiteArray = websiteList.split(",");
						    }
						    else if (websiteList.toLowerCase().indexOf(":") >= 0) {
						        websiteArray = websiteList.split(":");
						    }
						    else {
						        websiteArray = websiteList.split(" ");
						    }

						    listHtmlOutput += "<tr>"
						        + "<td class='map-detail-label'>PROJECT WEBSITE: </td>"
						        + "<td>";
						    for (var i = 0; i < websiteArray.length; i++) {
						        var websiteUrl = websiteArray[i];
						        listHtmlOutput += "<A HREF='" + ((websiteUrl.toLowerCase().indexOf("http") < 0) ? ("http://" + websiteUrl.trim()) : websiteUrl.trim()) + "' target='_blank'>"
						            + websiteUrl + "</a><br/>";
						    }

                            listHtmlOutput +="</td>"
							    + "</tr>";
						}

						

						if (feature.properties.relatedLinks != null) {

						    listHtmlOutput += "<tr>"
                               + "<td class='map-detail-label'>RELATED LINKS: </td>"
                               + "<td>";

						    var alllinks = feature.properties.relatedLinks;
						    $(JSON.parse(alllinks)).each(function (index, element) {
						        listHtmlOutput += "<div><a href='" + ((element.url.toLowerCase().indexOf("http") < 0) ? ("http://" + element.url.trim()) : element.url.trim()) + "' target='_blank'>" + element.text + "</a></div>";
						    });

						    listHtmlOutput += "</td>"
							    + "</tr>";
						}

	$('#project-description tbody').html(listHtmlOutput);
	
	
	
	
}

function writeCapitalFeatureDetails(feature)
{
	var listHtmlOutput = "";

		var budgetDisplay = formatBudgetDisplay(feature.properties.budget);
	
		listHtmlOutput += "<tr>"  
			+ "<td class='map-detail-label link'>ADDRESS:</td>"
					+ "<td>" + ((feature.properties.address != null) ?  feature.properties.address : tbdText) + "</td>"
					+ "</tr>"
					+"<tr>"
					+ "<td class='map-detail-label'>MUNICIPALITY:</td>"
					+ "<td>" + ((feature.properties.municipality != null) ?  feature.properties.municipality : tbdText) + "</td>"
					+ "</tr>"
					+ "<tr>"	
					+ "<td class='map-detail-label'>SECTOR:</td>"
					+ "<td>" + feature.properties.type + "</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td class='map-detail-label'>SCHEDULE:</td>"
					+ "<td>" + feature.properties.schedule + "</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td class='map-detail-label'>BUDGET:</td>"
					+ "<td>" + budgetDisplay + "</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td class='map-detail-label'>STAGE:</td>"
					+ "<td>" + ((feature.properties.stage != null) ?  "<a href=/capital-plan-stages#" + feature.properties.stage.toLowerCase() + " target='_blank'>" + feature.properties.stage + "</a\>" : tbdText) + "</td>"
					+ "</tr>"
					+  "<tr>"
					+ "<td class='map-detail-label'>CONTRACTOR:</td>"
					+ "<td>" + ((feature.properties.constructionContractor != null) ? feature.properties.constructionContractor : tbdText) + "</td>"
					+ "</tr>"
					+ "<tr>"
					+ "<td class='map-detail-label'>CONSULTANT:</td>"
					+ "<td>" + ((feature.properties.architect != null) ? feature.properties.architect : tbdText) + "</td>"
					+ "</tr>"
					+ "<tr>"
					//+ "<td class='map-detail-label'>STAKEHOLDER: </td>"
					//+ "<td>" + ((feature.properties.partnership != null) ? feature.properties.partnership : tbdText) + "</td>"
					//+ "</tr>"
				
	$('#project-description tbody').html(listHtmlOutput);
	
}


function writeFeatureReportCard(feature)
{
	if (feature.properties.isCapitalPlan)
	{
		
		$('#project-report-card').removeClass("hidden");
		

		
		var listHtmlOutput = "";
		
		//use this code if we want icons
		listHtmlOutput += "<tr>"
						+ "<td class='map-detail-label'>SCHEDULE STATUS:</td>"
							+ "<td>" + ((feature.properties.scheduleStatus != null) ? feature.properties.scheduleStatus : "") + "</td>"
						+ "</tr>"
						+ "<tr>"	
						+ "<td class='map-detail-label'>BUDGET STATUS:</td>"
						+ "<td>" + ((feature.properties.budgetStatus != null) ? feature.properties.budgetStatus : "") + "</td>"
						+ "</tr>";
		
		if (feature.properties.projectNotes != null)
		{
				listHtmlOutput += "<tr>"
				+ "<td class='map-detail-label'>PROJECT NOTES: </td>"
				+ "<td>" + feature.properties.projectNotes + "</td>"
				+ "</tr>";		
		}
							
						
		
		$('#project-report-card-details tbody').html(listHtmlOutput);
	}	
}

function translateStatusToClass(status)
{
	var className = "";
	
	if (status != undefined)
	{
		className = "status-" + status.toLowerCase().replace(' ', '-');
	}
	return className;
}

function buildPopupContent(feature)
{
	var budgetDisplay = formatBudgetDisplay(feature.properties.budget);
	
	var popup = 	"<h1>" + feature.properties.name + "</h1>" 
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
					+ "</table>";	

	return popup;

}

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
        var popupContent = buildPopupContent(feature);
        layer.bindPopup(popupContent);
    }
}

function pointToLayer(feature, latlng) {
   

	var myIcon = null;

	if (feature.properties.type)
	{
		var projectName = CAPITAL_PROJECT_NAMES[feature.properties.type.toUpperCase()];

		if (projectName != null)
		{
			myIcon = L.icon({
			iconUrl: '/images/' + projectName + '-pin.png',	
			iconSize:     [36, 90], // size of the icon
			shadowSize:   [50, 64], // size of the shadow
			iconAnchor:   [18, 46], // point of the icon which will correspond to marker's location
			shadowAnchor: [25, 53],  // the same for the shadow
			popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor
			});
			
		}
		else
		{
			myIcon = L.MakiMarkers.icon({icon: null, color: "#1d86a5", size: "l"});
		}
	}
	else
	{
		myIcon = L.MakiMarkers.icon({icon: null, color: feature.properties.color, size: "l"});
	}
	
	
   return L.marker(latlng, {icon: myIcon});
}
	
function createMap()
{
	
	map = L.map('map').setView(CENTRAL_ALBERTA, 13);

	L.mapbox.accessToken = 'pk.eyJ1IjoiZWFld2VidGVhbSIsImEiOiJDRDZCM0dNIn0.F_vK4KbOx7aTmFtaHaGgwQ';
	var layers = {
	    Streets: L.mapbox.tileLayer('eaewebteam.kp9gk5oi'),
	    Satellite: L.mapbox.tileLayer('eaewebteam.kpa5epio')
	};
    
	layers.Satellite.addTo(map);

    L.control.layers(layers).addTo(map);

}

function initMap()
{

 
	if (!map)
	{
		createMap();
	}
	
	if (markers === undefined)
	{
		markers = L.markerClusterGroup();
	}
	
	markers.clearLayers();
	

	geoJsonLayer = L.geoJson(currentFeature,{
			onEachFeature: onEachFeature,
			pointToLayer: pointToLayer,
			style: style
		}
	);
	
	markers.addLayer(geoJsonLayer);
	map.addLayer(markers);
	
	//var maxZoom = map.getBoundsZoom(markers.getBounds());	
	map.fitBounds(markers.getBounds(), {maxZoom:15});
}

function style(feature)
{
	if (feature.geometry && feature.geometry.type != "Point") {
        return {
			weight: 4,
			opacity: 1,
			color: feature.properties.color,
			dashArray: '1',
			fillOpacity: 0.3,
			fillColor: '#ff0000'
		};
	} else {
		return {
			weight: 4,
			opacity: 1,
			color: '#05ae40',
			dashArray: '1',
			fillOpacity: 0.3,
			fillColor: '#666666'
		};
	}
}

function setMarkerInView()
{
	map.removeLayer(markers);
	map.addLayer(markers);
	map.fitBounds(markers.getBounds(), {maxZoom:15});

}

function formatBudgetDisplay(budget) {

	var budgetDisplay = tbdText;
			
	if (budget != null){
			if (parseFloat(budget).toFixed(0).length >= 4)
				budgetDisplay = "$" + (parseFloat(budget)/1000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "B";
			else
				budgetDisplay = "$" + parseFloat(budget).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "M";
					
	}
	return budgetDisplay;
}
