// initialize the map
var map = L.map('map').setView([31.78, -81], 12);

// load a tile layer

//L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png').addTo(map);
var wcolor = L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
  attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.',
  opacity: 0.4
});
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: 'Map data OpenStreetMap',
    opacity: 1
});
var esriImg = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'ESRI',
  opacity: 1
});
osm.addTo(map);
var baseMaps = {
  "Streets": osm,
  "Imagery": esriImg
};
var controlLayers = L.control.layers(baseMaps).addTo(map);
$.getJSON("https://rawgit.com/jencarta/geojson_data/master/BIRDS_symbols.geojson", function(data) {
  var polys = L.geoJson(data, {
    style: function (feature) {
      return {
        weight: 2,
        opacity: 0.8,
        color: getColor(feature.properties.RARNUM),
        fillColor: getColor(feature.properties.RARNUM),
        fillOpacity: 0.2
        //dashArray: '4'
      };
    },
    onEachFeature: onEachFeature
  }).addTo(map);
  controlLayers.addOverlay(polys, 'Bird polygons');
});

function getColor(ind) {
  return ind == 0 ? '000000' :
         ind > 239 ? '#FF5100' :
         ind > 181 ? '#FF7300' :
         ind > 156 ? '#FF9100' :
         ind > 117 ? '#FFB300' :
         ind > 115 ? '#FFD000' :
         ind > 92 ? '#FFF200' :
         ind > 76 ? '#E8F000' :
         ind > 34 ? '#BDD600' :
         ind > 22 ? '#97BD00' :
         ind > 18 ? '#70A300' :
                    '#4D8C00';
}

function getSymbURL(symbol) {
  return symbol == 'shorebird' ? 'http://esionline.researchplanning.com/atlases/icons/shorebird.png' :
         symbol == 'waterfowl' ? 'http://esionline.researchplanning.com/atlases/icons/waterfowl.png' :
         symbol == 'gull tern' ? 'http://esionline.researchplanning.com/atlases/icons/gull-tern.png' :
         symbol == 'alcids' ? 'http://esionline.researchplanning.com/atlases/icons/seabird.png' :
         symbol == 'diving' ? 'http://esionline.researchplanning.com/atlases/icons/divingbird.png' :
         symbol == 'pelagic' ? 'http://esionline.researchplanning.com/atlases/icons/seabird.png' :
         symbol == 'wading' ? 'http://esionline.researchplanning.com/atlases/icons/wadingbird.png' :
         symbol == 'raptor' ? 'http://esionline.researchplanning.com/atlases/icons/raptor.png' :
         symbol == 'passerine' ? 'http://esionline.researchplanning.com/atlases/icons/passerine_bird.png' :
                                 'http://esionline.researchplanning.com/atlases/icons/seabird.png' ;
}

function getIconSize(zlevel) {
  return zlevel > 14 ? [35,35] :
         zlevel > 13 ? [28,28] :
         zlevel > 10 ? [22,22] :
         zlevel > 9 ? [12,12] :
         zlevel > 8 ? [5,5] :
         zlevel > 7 ? [3,3] :
                      [0,0] ;
}