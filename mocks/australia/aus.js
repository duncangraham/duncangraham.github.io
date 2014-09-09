
mapboxgl.accessToken = 'pk.eyJ1IjoicGRnb29kbWFuIiwiYSI6IjdITEZQTVkifQ.jSHttbpZ0JNMYoM2cSK5MA';

var places = {
  "type": "FeatureCollection",
  "features": [
      {
        "geometry": {
                "type": "Point",
                "coordinates": [134.5569, -29.5060]
              },
        "properties": {
                "id": "cover",
                "zoom": 14,
                "bearing": 4
              },
        "type": "Feature"
      },
      {
            "geometry": {
                    "type": "Point",
                    "coordinates": [134.56021, -29.50642]
                  },
            "properties": {
                    "id": "xfer",
                    "zoom": 18,
                    "bearing": -85
                  },
            "type": "Feature"
          },
      {
            "geometry": {
                    "type": "Point",
                    "coordinates": [134.55675, -29.5]
                  },
            "properties": {
                    "id": "value",
                    "zoom": 16,
                    "bearing": 0
                  },
            "type": "Feature"
          },
      {
            "geometry": {
                    "type": "Point",
                    "coordinates": [134.5613, -29.5071]
                  },
            "properties": {
                    "id": "activity",
                    "zoom": 16,
                    "bearing": 93
                  },
            "type": "Feature"
          },
      {
            "geometry": {
                    "type": "Point",
                    "coordinates": [134.56438, -29.51117]
                  },
            "properties": {
                    "id": "water",
                    "zoom": 18,
                    "bearing": 4
                  },
            "type": "Feature"
          },
      {
            "geometry": {
                    "type": "Point",
                    "coordinates": [134.56164, -29.50788]
                  },
            "properties": {
                    "id": "capacity",
                    "zoom": 18,
                    "bearing": -86
                  },
            "type": "Feature"
          },
      {
            "geometry": {
                    "type": "Point",
                    "coordinates": [134.6562, -29.5368]
                  },
            "properties": {
                    "id": "traffic",
                    "zoom": 17,
                    "bearing": 12.5
                  },
            "type": "Feature"
          },
          {
                "geometry": {
                        "type": "Point",
                        "coordinates": [134.68590, -29.54215]
                      },
                "properties": {
                        "id": "risk",
                        "zoom": 18,
                        "bearing": -78
                      },
                "type": "Feature"
              }
    ]
};

var placesLayer = new mapboxgl.GeoJSONSource({data: places});

var map = new mapboxgl.Map({
  container: 'map',
  style: 'https://www.mapbox.com/bites/00046/style.json',
  center: [-29.5060, 134.5569],
  zoom: 13
});

var narrative = document.getElementById('narrative'),
    container = narrative.getElementsByClassName('sections')[0],
        sections = narrative.getElementsByTagName('section'),
            currentId = '';

            function setHeight() {
              container.style.paddingBottom = (window.innerHeight - 200) + 'px';
            }
            setHeight();

            window.onresize = function(e) {
              setHeight();
            };

            setTimeout(function() {
              map.addSource('places', placesLayer);
              setId('cover');
            }, 800);

            setInterval(function() {
              if (!map || !map.style.hasClass('active')) return;
              if (map.style.hasClass('pulse')) {
                  map.style.removeClass('pulse');
                } else {
                    map.style.addClass('pulse');
                  }
            }, 950);

            function setId(newId) {
                if (newId === currentId) return;
            
                if (newId === 'cover') {
                      map.style.removeClass('active');
                      map.style.removeClass('pulse');
                    } else {
                          map.style.addClass('active');
                        }
            
                for (var i = 0; i < places.features.length; i++) {
                      var layer = places.features[i];
                      var id = layer.properties.id;
                      if (id === newId) {
                              map.stop();
                              map.flyTo([layer.geometry.coordinates[1], layer.geometry.coordinates[0]], layer.properties.zoom || 14, layer.properties.bearing);
                            }
                    };
                for (var i = 0; i < sections.length; i++) {
                        if (sections[i].id === newId) {
                                    sections[i].classList.add('active');
                                } else {
                                            sections[i].classList.remove('active');
                                        }
                    }
                currentId = newId;
            }

            narrative.onscroll = function(e) {
                var narrativeHeight = narrative.offsetHeight;
                var newId = currentId;
                for (var i = sections.length - 1; i >= 0; i--) {
                        var rect = sections[i].getBoundingClientRect();
                        if (rect.top >= 0 && rect.top <= narrativeHeight) {
                                    newId = sections[i].id;
                                }
                    };
                setId(newId);
            };
