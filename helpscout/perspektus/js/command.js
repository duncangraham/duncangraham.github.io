/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function animToQueue(theQueue, selector, animationprops, delay) {
    theQueue.queue(function(next) {
        $(selector).animate(animationprops, delay, next);
    });
}
var q = $({});
var m = $({});
var preMap = 'mediopolis.21d14749';
function getIcon(maptype,mapselected){
 var   mapIcon =  "mapicon_"+maptype.replace(/\_/g, '')+".png";
 return mapIcon;
}
function searchOnMap(bindid) {
    var input = /** @type {HTMLInputElement} */(
            document.getElementById(bindid));
    //  var autocomplete = new google.maps.places.Autocomplete(input);
    var searchBox = new google.maps.places.SearchBox((input));


    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        infowindow.close();

        var places = searchBox.getPlaces();


        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            // map.setView([place.geometry.location.lat(),place.geometry.location.lng()],14);

            $("#loc").html(place.name.replace(/([~!@#$%^*()_+=`{}\[\]\|\\:'<>,.\/? ])+/g, '').replace(/^(-)+|(-)+$/g,''));
            console.log( $("#loc").html() + "   width : "+$("#loc").width());

            bounds.extend(place.geometry.location);
            L.marker([
                place.geometry.location.lat(), place.geometry.location.lng()
            ], {
                icon: L.divIcon({
                    // Specify a class name we can refer to in CSS.
                    className: 'dot',
                    // Define what HTML goes in each marker.
                    html: getCurrentLocationPoint(place.name, place.types[0], $("#loc").width()),
                    // Set a markers width and height.
                    iconSize: [34, 34]
                })
            }).addTo(map);

        }
        $('.dot').hover(function() {

        var currentMarker = $(this).find(".rightPopup");
        var cwidth = currentMarker.attr('dwidth')+25;

        $(this).find(".currentDot").animate({borderWidth:1},400);
        currentMarker.animate({
            speed: 0,

            //some unimportant CSS to animate so we get some values
        },
                {
                    step: function(now, fx) { //now is the animated value from initial css value
                        $(currentMarker).css('clip', 'rect(0px, ' + cwidth + 'px, 50px, ' + Math.ceil(now) + 'px)');

                    }
                }, 2000);

    }, function() {

        var currentMarker = $(this).find(".rightPopup");
        var cwidth = currentMarker.attr('dwidth')+25;
        var val = parseInt($(currentMarker).attr('dwidth'))+25;
        $(this).find(".currentDot").animate({borderWidth:0},400);
        currentMarker.animate({
            speed: val,

            //some unimportant CSS to animate so we get some values
        },
                {
                    step: function(now, fx) { //now is the animated value from initial css value
                        $(currentMarker).css('clip', 'rect(0px, ' + cwidth + 'px, 50px, ' + parseInt(now) + 'px)');

                    }
                }, 2000);

    });

        map.setView([bounds.getCenter().lat(), bounds.getCenter().lng()], 14);

    });
}
function getCurrentLocationPoint(title, category, icon) {
    var mapIcon = getIcon(category,'')
    return "<span class='rightPopup' dwidth='" + icon + "' style='speed:" + (icon + 25) + ";width:" + (icon) + "px;clip:rect(0px," + (icon + 25) + "px,50px," + (icon + 25) + "px)'><span class='currentLocTitle'>" + title + "</span><span class='currentLocCat'>" + category + "</span></span><img src='/images/searchicons/"+mapIcon+"' class='currentDot'>";
}
$(window).load(function() {


    /*on load flickering start*/
    $('#mainmenu').delay(50).animate({width: '+=124', easing: 'easeOutQuart'}, 400);

    $('#quickmenu').delay(500).animate({height: '+=40', easing: 'easeOutQuart'}, 400);

    $('#cmdmapstyles').hide().delay(100).fadeIn(5).fadeOut(10).fadeIn(15).fadeOut(15).fadeIn(10).fadeOut(15).fadeIn(20).fadeOut(20).fadeIn(25).fadeOut(20).fadeIn(25).fadeOut(30).fadeIn(35).fadeOut(40).fadeOut(50).fadeOut(60).fadeIn(100);

    $('#cmddatamap').hide().delay(500).fadeIn(5).fadeOut(10).fadeIn(15).fadeOut(15).fadeIn(10).fadeOut(15).fadeIn(20).fadeOut(20).fadeIn(25).fadeOut(20).fadeIn(25).fadeOut(30).fadeIn(35).fadeOut(40).fadeOut(50).fadeOut(60).fadeIn(100);

    $('#cmddashboard').hide().delay(800).fadeIn(5).fadeOut(10).fadeIn(15).fadeOut(15).fadeIn(10).fadeOut(15).fadeIn(20).fadeOut(20).fadeIn(25).fadeOut(20).fadeIn(25).fadeOut(30).fadeIn(35).fadeOut(40).fadeOut(50).fadeOut(60).fadeIn(100);

    $('#cmdweather').hide().delay(1000).fadeIn(5).fadeOut(10).fadeIn(15).fadeOut(15).fadeIn(10).fadeOut(15).fadeIn(20).fadeOut(20).fadeIn(25).fadeOut(20).fadeIn(25).fadeOut(30).fadeIn(35).fadeOut(40).fadeOut(50).fadeOut(60).fadeIn(100);

    $('#cmdsearch').hide().delay(1100).fadeIn(5).fadeOut(10).fadeIn(15).fadeOut(15).fadeIn(10).fadeOut(15).fadeIn(20).fadeOut(20).fadeIn(25).fadeOut(20).fadeIn(25).fadeOut(30).fadeIn(35).fadeOut(40).fadeOut(50).fadeOut(60).fadeIn(100);

    $('#cmdsearchgo').hide().delay(1100).fadeIn(5).fadeOut(10).fadeIn(15).fadeOut(15).fadeIn(10).fadeOut(15).fadeIn(20).fadeOut(20).fadeIn(25).fadeOut(20).fadeIn(25).fadeOut(30).fadeIn(35).fadeOut(40).fadeOut(50).fadeOut(60).fadeIn(100);

    $('#cmdnav').hide().delay(1250).fadeIn(5).fadeOut(10).fadeIn(15).fadeOut(15).fadeIn(10).fadeOut(15).fadeIn(20).fadeOut(20).fadeIn(25).fadeOut(20).fadeIn(25).fadeOut(30).fadeIn(35).fadeOut(40).fadeOut(50).fadeOut(60).fadeIn(100);
    /*on load flickering end*/
    /*Load default map start*/
    setTimeout(function() {
        $("li.cmd-mapstyles-item[data-bind='mediopolis.21d14749']").trigger("click");
    }, 10);
    /*Load default map end*/


    /*get my location start*/

    searchOnMap("pac-input");
    if (!navigator.geolocation) {
        $(".cmd-nav-livecoord").html('Geolocation is not available');
    } else {
        $('#gpsfix').click(function(e) {

            e.preventDefault();
            e.stopPropagation();
            map.locate();
        });
    }
    var myLocation = '<a href="#"><div class="myloc"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 18 18" enable-background="new 0 0 18 18" xml:space="preserve"><path class="myloc-icon" d="M9 5.7C7.2 5.7 5.7 7.2 5.7 9c0 1.8 1.5 3.3 3.3 3.3c1.8 0 3.3-1.5 3.3-3.3C12.3 7.2 10.8 5.7 9 5.7L9 5.7z M16.3 8.2 C15.9 4.7 13.2 2 9.8 1.7V0H8.2v1.7C4.7 2 2 4.7 1.7 8.2H0v1.6h1.7c0.4 3.4 3.1 6.1 6.5 6.5V18h1.6v-1.7c3.4-0.4 6.1-3.1 6.5-6.5H18 V8.2H16.3z M9 14.7c-3.2 0-5.7-2.5-5.7-5.7S5.8 3.3 9 3.3c3.2 0 5.7 2.5 5.7 5.7S12.2 14.7 9 14.7L9 14.7z M9 14.7"/></svg></div></a>';
    map.on('locationfound', function(e) {
        map.fitBounds(e.bounds);


        L.marker([
            e.latlng.lat, e.latlng.lng
        ], {
            icon: L.divIcon({
                // Specify a class name we can refer to in CSS.
                className: 'myloc-circle',
                // Define what HTML goes in each marker.
                html: myLocation,
                // Set a markers width and height.
                iconSize: [100, 100]
            })
        }).addTo(map);

    });

    map.on('locationerror', function() {
        alert('Position could not be found');
    });



    /*get my location end*/




    var toggled = true;
    $('.cmd-nav-getlocation').slideUp(200);
    $('.cmd-nav-getdirection').slideUp(200);

    $('.myloc').hover(
            function() {
                $('.cmd-nav-livecoord').slideUp(200);
                $('.cmd-nav-getlocation').slideDown(200);
            },
            function() {
                $('.cmd-nav-getlocation').slideUp(200);
                $('.cmd-nav-livecoord').slideDown(200);
            }
    );

    $('.getdir').hover(
            function() {
                $('.cmd-nav-livecoord').slideUp(200);
                $('.cmd-nav-getdirection').slideDown(200);
            },
            function() {
                $('.cmd-nav-getdirection').slideUp(200);
                $('.cmd-nav-livecoord').slideDown(200);
            }
    );

  L.control.layers({
    'Satellite Night': L.mapbox.tileLayer('mediopolis.a3be16d1'),
    'Satellite NatGeo': L.mapbox.tileLayer('mediopolis.76cdc8a0'),
    'Bike and Hike': L.mapbox.tileLayer('mediopolis.21d14749'),
    'Standard Night': L.mapbox.tileLayer('mediopolis.8a3b3206'),
    'Deep Flat Gray': L.mapbox.tileLayer('mediopolis.fd78e255'),

}).addTo(map);


    $('.cmd-weather-icon').hover(
            function() {
                $(".cmd-weather-des").animate({width: "190px", opacity: "1"}, 200);
            },
            function() {
                $(".cmd-weather-des").animate({width: "112px", opacity: "0"}, 200);
            }
    );

    $(".cmd-mapstyles-item").hover(function() {
        mouseoversound6.playclip();
        $(this).find('.imgborder').animate({height: '48px', easing: 'easeOutQuart'}, 400);
    }, function() {
        $(this).find('.imgborder').animate({height: '0px', easing: 'easeOutQuart'}, 400);
    });

    $(".cmd-mapstyles-item").click(function(e) {
        clicksound5.playclip();
        var current = this;
        var mapid = $(this).attr('data-bind');



        //setMapToken();
        map.eachLayer(function(layer) {
            map.removeLayer(layer);
        });

        map.addLayer(L.mapbox.tileLayer(mapid));

        $(".cmd-mapstyles-item").find(".arrow_box").after().css('left', "0px");
        $(".cmd-mapstyles-item").find(".arrow_box").after().css("opacity", "0");
        $(this).find(".arrow_box").after().css("opacity", "0.55");
        $(this).find(".arrow_box").after().animate({left: "242px"}, 600, function() {
        });
        e.stopPropagation();
    });

    $("#Layer_1").click(function() {
        var d = $("#dir").val();

        if (d == 1) {
            //  $('#cmdmapstyles , #cmddashboard , #cmdsearch , #cmdsearchgo , #cmddatamap,#cmdweather, #cmdnav').transition({right:-244},500,"ease");
            $("#cmd-panel").transition({right: -530}, 500, "ease");
            $(".cmd-hidepanel-arrow svg").css('transform', 'rotate(180deg)');
            $("#dir").val(0);
        }
        else
        {
            $("#cmd-panel").transition({right: 0}, 500, "ease");
            $(".cmd-hidepanel-arrow svg").css('transform', 'rotate(360deg)');
            $("#dir").val(1);
        }
    });
    $.ajax({url:
                "http://api.wunderground.com/api/dec8fce1f99c87f0/forecast/q/autoip.json", dataType: "jsonp",
        success: function(parsed_json)
        {
            $(".cmd-weather-icon-img").attr('src', parsed_json.forecast.simpleforecast.forecastday[0].icon_url);
            $(".cmd-weather-icon-img").show();
            $(".cmd-weather-temphi").html(parsed_json.forecast.simpleforecast.forecastday[0].high.fahrenheit);
            $(".cmd-weather-templow").html(parsed_json.forecast.simpleforecast.forecastday[0].low.fahrenheit);
            $(".weather-des").html(parsed_json.forecast.simpleforecast.forecastday[0].conditions)
        }});

    $.ajax({url:
                "http://api.wunderground.com/api/dec8fce1f99c87f0/conditions/q/autoip.json", dataType: "jsonp",
        success: function(parsed_json)
        {
            $(".cmd-weather-temp").html(parsed_json.current_observation.temp_f.toFixed());
        }});





    $('#cmdmapstyles').bind('click', function(e) {
        var i = 0;
        if (toggled) {
            $('.maptype li').css("width", "122px");
            //$('.maptype').show();
            var isrunning = true;
            e
            var h = $('.maptype').height() + 10;
            $('.maptype').animate({opacity: 1});
            $("#cmdmapstyles").stop().animate({marginBottom: h + 'px'}, {duration: 200, queue: false, step: function(now, fx) {
                    $('.bottom_arrow').fadeIn("slow");
                    i = (i++ % 6) + 1;
                    if (i == 6)
                        isrunning = false;


                    if (i < 6 && isrunning) {
                        console.log(i + "  " + (800 - i * 150));

                        $('.maptype li:nth-child(' + i + ')').animate(
                                {
                                    width: "240px",
                                    opacity: 1
                                },
                        {
                            easing: "easeOutQuad",
                            duration: 800 - i * 150,
                            queue: true,
                            complete: function() {


                                $(this).find(".mapimg").fadeIn(800);

                            }
                        });
                    }
                }, complete: function() {
                    toggled = false;
                }
            }
            );


        } else {

            $('.bottom_arrow').fadeOut("slow");

            isrunning = true;
            $("#cmdmapstyles").stop().animate({marginBottom: 0}, {queue: false, duration: 600, step: function(now, fx) {
                    i = (i++ % 6) + 1;
                    if (i == 6)
                        isrunning = false;
                    if (i < 6 && isrunning) {
                        animToQueue(q, '.maptype li:nth-child(' + i + ')', {opacity: "0", width: "0px"}, (i * 30));
                        //console.log("value of " + (i * 40));
                    }
                },
                complete: function() {
                    toggled = true;
                    //$('.maptype').hide();
                }
            }
            );

//                  $("#cmdmapstyles").animate({marginBottom: '0'}, function() {

            /*  i = (++i % 3) + 1;
             $('.maptype li:nth-child(' + i + ')').animate({opacity: 0},
             {
             queue: false,
             complete:function(){
             $(this).find(".mapimg").fadeOut(800);
             }
             });
             */
            //}
            //},start:function(){


            //          });
            //toggled = true;

        }
    });


});//]]>
var html5_audiotypes = {//define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
    "mp3": "audio/mpeg",
    "mp4": "audio/mp4",
    "ogg": "audio/ogg",
    "wav": "audio/wav"
}

function createsoundbite(sound) {
    var html5audio = document.createElement('audio')
    if (html5audio.canPlayType) { //check support for HTML5 audio
        for (var i = 0; i < arguments.length; i++) {
            var sourceel = document.createElement('source')
            sourceel.setAttribute('src', arguments[i])
            if (arguments[i].match(/\.(\w+)$/i))
                sourceel.setAttribute('type', html5_audiotypes[RegExp.$1])
            html5audio.appendChild(sourceel)
        }
        html5audio.load()
        html5audio.playclip = function() {
            html5audio.pause()
            html5audio.currentTime = 0
            html5audio.play()
        }
        return html5audio
    }
    else {
        return {playclip: function() {
                throw new Error("Your browser doesn't support HTML5 audio unfortunately")
            }}
    }
}

var mouseoversound1 = createsoundbite("http://theoryevolution.com/perspektus/sound/hover1-mid.ogg")
var mouseoversound2 = createsoundbite("http://theoryevolution.com/perspektus/sound/hover2-mid.ogg")
var mouseoversound3 = createsoundbite("http://theoryevolution.com/perspektus/sound/hover3.ogg")
var mouseoversound4 = createsoundbite("http://theoryevolution.com/perspektus/sound/click2-mid.ogg")
var mouseoversound5 = createsoundbite("http://theoryevolution.com/perspektus/sound/swipe1.ogg")
var mouseoversound6 = createsoundbite("http://theoryevolution.com/perspektus/sound/click1.ogg")
var clicksound1 = createsoundbite("http://theoryevolution.com/perspektus/sound/blip1-mid.ogg")
var clicksound2 = createsoundbite("http://theoryevolution.com/perspektus/sound/click2-mid.ogg")
var clicksound3 = createsoundbite("http://theoryevolution.com/perspektus/sound/click1-mid.ogg")
var clicksound4 = createsoundbite("http://theoryevolution.com/perspektus/sound/fade1.ogg")
var clicksound5 = createsoundbite("http://theoryevolution.com/perspektus/sound/chirp2-mid.ogg")
var clicksound6 = createsoundbite("http://theoryevolution.com/perspektus/sound/click1.ogg")
