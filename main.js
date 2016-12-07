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