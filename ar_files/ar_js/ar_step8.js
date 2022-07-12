window.onload = () => {
    let places = staticLoadPlaces();
    console.log(places);
    renderPlaces(places);
};

document.documentElement.requestFullscreen();

function staticLoadPlaces() {
    return [
        {
            name: 'River',
            location: {
                lat: 46.513278984321566,
                lng: 6.648818952768574,
            }
        },
        {
            name: 'Cactus',
            location: {
                lat: 46.513242067112145,
                lng: 6.64953061533322,
            }
        }
    ];
}


function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {

        // on va chercher les latitude et longitude
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        // on va chercher les noms de chacun de nos modèles pour les utiliser avec nos IF statements
        let name = place.name;

        // test du modèle gltf
        if (name == 'River') {
            let model = document.createElement('a-entity');
            model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            model.setAttribute('gltf-model', '../../assets/gltf/cactus/scene.gltf');
            model.setAttribute('rotation', '0 140 0');
            model.setAttribute('animation-mixer', '');
            model.setAttribute('scale', '0.5 0.5 0.5');
            model.setAttribute('position', '-20 0 0');

            model.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });

            scene.appendChild(model);
        }


        if (name == 'Plane') {

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

            scene.appendChild(plane);
        
        }
        


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

   });
};