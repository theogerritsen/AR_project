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

///////////////////////////////////////////////////////////////////
////////// GESTION DES ARRETS /////////////////////////////////
////////////////////////////////////////////////////////////    

// ajout du marqueur personnalisé

let iconePerso = L.icon({
    iconUrl: 'https://github.com/theogerritsen/AR_project/blob/main/assets/marker1.png?raw=true',
    iconSize:[50, 50]
});


// ajout des arrets

let arrets = new L.geoJson(arret, {
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {icon: iconePerso});
    }
}).addTo(mymap);

L.geoJSON(sentier, {
    "color": "#3081ff",
    "weight": 7,
    "dashArray": [0, 13]
}).addTo(mymap);

osmLayer.addTo(mymap);