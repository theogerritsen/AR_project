/////////////////////////////////////////////////
/////////// IMPLEMENTATION DE CARTE ////////////
////////////////////////////////////////////////



// option de la carte

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlb2dlcnJpdHNlbiIsImEiOiJja3R2Zzkybzkwa25oMm5tcGp1MWY0enh1In0.n_ye_r9ELbLqxyWl-giSlA';
const mymap = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [6.629357, 46.520009], // starting position
    zoom: 16 // starting zoom
    // pitch: 60,
    // bearing: -60
});


// fit bounds pour voir le parcours sur n'importe quel résolution d'écran
mymap.fitBounds([
    [6.6240245,46.5184540],
    [6.6360568,46.5233845]
]);

 
// Add geolocate control to the map.
mymap.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
);

// ajout des controles pour le zoom et remettre le nord en haut

mymap.addControl(new mapboxgl.NavigationControl());

///////////////////////////////////////////////////////////////////
////////// GESTION DES ARRETS /////////////////////////////////
////////////////////////////////////////////////////////////    


// on lit chaque point de notre geoJSON qui correspond aux arrêts

let n = 0

for (const feature of arret.features) {
    console.log(feature)

    // pour chaque feature trouvé dans notre geojson
    // on incrémente n de 1
    n++;
    console.log(n)
    // pour chaque arret, on crée un nouveau div dans l'html
    const el = document.createElement('div');
    el.className = 'marker';

    el.style.backgroundImage = "./assets/marqueurs_etapes" + n

    new mapboxgl.Marker(el, {
        anchor: 'bottom'
    })
    // on  va chercher les coordonnées de chacun de nos marqueurs
    .setLngLat(feature.geometry.coordinates)
    .addTo(mymap);
}

/// Ajout de la multiline string
mymap.on('load', () => {
    mymap.addSource('route', {
        'type': 'geojson',
        // on va chercher les propriétés de notre lignes dans chemin.js
        'data': sentier
    });
    mymap.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#3081ff',
            'line-width': 7,
            'line-dasharray': [0, 2]
        }
    });
})
console.log(sentier)

