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

 
// on insère nos informations de géolocalisation dans une variable
let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    // update sur la position du user dès qu'il bouge
    trackUserLocation: true,
    // montre l'orientation du user
    showUserHeading: true
});

// on ajoute le bouton de géolocalisation à la carte
mymap.addControl(geolocate);

// lat long du user pour la fonction GPS plus tard
geolocate.on('geolocate', function(e) {
    let user_lon = e.coords.longitude;
    let user_lat = e.coords.latitude;
    let user_position = [user_lon, user_lat];
    console.log(user_position);
});


// ajout des controles pour le zoom et remettre le nord en haut

mymap.addControl(new mapboxgl.NavigationControl());

///////////////////////////////////////////////////////////////////
////////// GESTION DES ARRETS /////////////////////////////////
////////////////////////////////////////////////////////////    


// on lit chaque point de notre geoJSON qui correspond aux arrêts


// on initialise n à 0 pour montrer les marqueurs par étape
let n = 0

for (const feature of arret.features) {
    // pour chaque feature trouvé dans notre geojson
    // on incrémente n de 1
    n++;
    // pour chaque arret, on crée un nouveau div dans l'html
    const el = document.createElement('div');
    el.className = 'marker';

    // on va chercher le marqueur qui correspond à la bonne étape
    el.style.backgroundImage = 'url(./assets/marqueurs_etapes/etape' + n + '.png';

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
            'line-width': 7
        }
    });
})
///////////////////////////////////////////////////////
//////////// IMPLEMENTATION DU MODE GPS //////////////
///////////////////////////////////////////////////////

// dès qu'on clique sur commencer le sentier,
// il faut centrer sur l'utilisateur et mettre la caméra dans la bonne direction
class ToggleControl extends mapboxgl.GeolocateControl {
    _onSuccess(position) {
        this.mymap.flyTo({
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 25,
            bearing: -90,
            pitch: 90
        });
    }

    onAdd(mymap, cs) {
        this.mymap = mymap;
        this.container = document.createElement('div');
        this.container.className = 'mapboxgl-ctrl';
        const button = this._createButton('monitor_button')
        this.container.appendChild(button);
        return this.container;
    }

    _createButton(className) {
        const el = window.document.createElement('button')
        el.className = className;
        el.textContent = 'Commencer le sentier';
        el.addEventListener('click', () => {
            this.trigger();
        });
        this._setup = true;
        return el;
    }
}

const toggleControl = new ToggleControl({})
mymap.addControl(toggleControl, 'top-left')


// initialisation du bouton pour flyto
// dès qu'on commence le sentier
// $('.itin-btn').click(function(e){
//     app.preload.show();
//     getLocation();
// });


