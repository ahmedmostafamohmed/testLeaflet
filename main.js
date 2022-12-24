console.log("Hello");
var map = L.map('map').setView([30.052991674056106, 31.346386004017436],16);


var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var EsriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' ,
    minZoom: 0.1,
	maxZoom: 16,
});


var StamenWatercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});
var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

var baseMaps = {
    'open street map' : osm ,
    'Esri World Imagery' : EsriWorldImagery,
    'Stamen Water color' : StamenWatercolor,
    'Esri WorldTopoMap' : Esri_WorldTopoMap,
    'CartoDB Dark' : CartoDB_DarkMatter
}
L.control.layers(baseMaps).addTo(map);



const Pointstyle = {
    radius : 5,
    fillColor : 'red' ,
    color : '#0000' ,
    weight : 5,
    opacity : 1 ,
    fillOpacity : 0.9
}
var userData = L.geoJSON(userData, {
    pointToLayer : function(feature , latLng){
        return L.circleMarker(latLng , Pointstyle)
    },
    pointToLayer: function(feature,latlng){
        label = String(feature.properties.POI_E_Name) // Must convert to string, .bindTooltip can't use straight 'feature.properties.attribute'
        return new L.CircleMarker(latlng, {
          radius: 1,
        }).bindTooltip(label, {permanent: true, 
   direction: "center",
   className: "my-labels"}).openTooltip();
        }
}).addTo(map);

L.marker([30.052991674056106, 31.346386004017436]).addTo(map)
