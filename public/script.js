/* custom JavaScript goes here */

$( document ).ready(function() {

    mapboxgl.accessToken = 'pk.eyJ1IjoieW91c3V2aWMiLCJhIjoiY2pwZnU2NnRzMGRrYzN3b3p4Zzc5dXhyaSJ9.qTIfzVFIQKErE-bICLehrw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-96, 37.8],
        zoom: 2
    });

    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    }));

    let route = 0;
    $('#datable tr').each(function() {

        let data_coord = $(this).find(".class-coordinates").html();
        let street = $(this).find(".class-street").html();
        let distance = $(this).find(".class-distance").html();

        if(data_coord && street && distance) {

            let lat = parseFloat(data_coord.substring(1, data_coord.indexOf(']')).split(/, ?/)[0]);
            let lng = parseFloat(data_coord.substring(1, data_coord.indexOf(']')).split(/, ?/)[1]);

            map.on('load', function () {

                let coordinates = [
                    [-77.036547, 38.897675],
                    [lng, lat]
                ];

                route++;

                // Draw lines

                map.addLayer({
                    "id": "route"+route,
                    "type": "line",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "LineString",
                                coordinates
                            }
                        }
                    },
                    "layout": {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    "paint": {
                        "line-color": "#888",
                        "line-width": 5
                    }
                });


                // Display streets address on the map

                map.addLayer({
                    "id": "points"+route,
                    "type": "symbol",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": [{
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [-77.036547, 38.897675]
                                },
                                "properties": {
                                    "title": "White House",
                                    "icon": "monument"
                                }
                            }, {
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [lng, lat]
                                },
                                "properties": {
                                    "title": street,
                                    "icon": "harbor"
                                }
                            }]
                        }
                    },
                    "layout": {
                        "icon-image": "{icon}-15",
                        "text-field": "{title}",
                        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                        "text-offset": [0, 0.6],
                        "text-anchor": "top",
                        "text-size": 10,
                    }
                });

            });
        };
    });

});

