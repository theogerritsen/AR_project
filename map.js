/////////////////////////////////////////////////
/////////// IMPLEMENTATION DE CARTE ////////////
////////////////////////////////////////////////

// option de la carte

let mymap = L.map('map', {

    // gestion des paramètres
    center : [46.520009, 6.629357],
    minZoom : 10,
    maxZoom: 18,
    zoom : 16,
    zoomSnap: 0.1,

});

const osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy, OpenStreetMap contribtuors'
});

osmLayer.addTo(mymap);