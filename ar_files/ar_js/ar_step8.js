window.onload = () => {
    let places = staticLoadPlaces();
    console.log(places);
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Magnemite',
            location: {
                lat: 46.51313335530353,
                lng: 6.648636329118053,
            }
        },
        {
            name: 'Pikachu',
            location: {
                lat: 46.52,
                lng: 6.7,
            }
        }
    ];
}

// function loadAssets(asset) {

//     // on va chercher notre balise a-assets
//     let assets = document.querySelector('a-assets');

//     asset.forEach((asset))
// }

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let plane = document.createElement('a-plane');
        plane.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        plane.setAttribute('height', '1');
        plane.setAttribute('width', '1');
        plane.setAttribute('src', '#cubes-thumb');
        plane.setAttribute('look-at', '[gps-camera]');
        plane.setAttribute('rotation', '0 90 0');
        plane.setAttribute('sound', 'on: click; src: #click-sound');
        plane.setAttribute('event-set__mouseenter', 'scale: 2 2 2');
        plane.setAttribute('event-set__mouseleave', 'scale: 1 1 1');
        //entity.setAttribute('event-set__click', '_target:');


        
        

        plane.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        let text = document.createElement('a-text');
       text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       text.setAttribute('scale', '10 10 10');
       text.setAttribute('look-at', '[gps-camera]');
       text.setAttribute('value', 'Coucou toi');
       text.setAttribute("animation__mouseenter", "property: scale; to: 20 20 20; dur: 300; startEvents: mouseenter");
        text.setAttribute("animation__mouseleave", "property: scale; to: 10 10 10; dur: 300; startEvents: mouseleave")

       text.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });
       //scene.appendChild(entity);
       scene.appendChild(plane);
   });
};