$(function(){
    $("#return-btn").click(function(){
        window.location.href = "../tracking.html"
    })
});

window.onload = () => {
    let places = staticLoadPlaces();
    console.log(places);
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pikachu',
            location: {
                lat: 46.51335216333632,
                lng: 6.649697990550806,
            }
        }
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('#step4');

    places.forEach((place) => {

            // pour utiliser les différentes coordonnées
            // on va passer le tout dans une boucle if


            let latitude = place.location.lat;
            let longitude = place.location.lng;

            let plane = document.createElement('a-plane');
                plane.setAttribute('id', 'st_laurent1');
                plane.setAttribute('gps-entity-place', `latitude: ${46.51335216333632}; longitude: ${6.649697990550806};`);
                plane.setAttribute('height', '1');
                plane.setAttribute('width', '1.5');
                plane.setAttribute('scale', '10 10 10');
                plane.setAttribute('position', '7.4 1.3 0.2');
                plane.setAttribute('src', '#st_laurent1');
                plane.setAttribute('look-at', '[gps-camera]');
                plane.setAttribute('sound', 'on: click; src: #click-sound');
                plane.setAttribute('event-set__mouseenter', 'scale: 13 13 13');
                plane.setAttribute('event-set__mouseleave', 'scale: 10 10 10');

                plane.addEventListener('click', () => {

                    if (plane.id == 'st_laurent1') {

                        plane.id = 'st_laurent2';
                        plane.setAttribute('src', '#st_laurent2');
                    }

                    else if (plane.id == 'st_laurent2') {

                        plane.setAttribute('id', 'st_laurent3');
                        plane.setAttribute('src', '#st_laurent3')
                    }

                    else if (plane.id == 'st_laurent3') {

                        plane.setAttribute('id', 'st_laurent1');
                        plane.setAttribute('src', '#st_laurent1');
                    }
                });

            plane.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });

            // let sphere = document.createElement('a-sphere');
            // sphere.setAttribute('gps-entity-place', `latitude: ${46.513}; longitude: ${6.648};`);
            // sphere.setAttribute('position', '0 0 0');
            // sphere.setAttribute('material', 'color: green');
            // sphere.setAttribute('sound', 'on: click; src: #click-sound');

            // sphere.addEventListener('loaded', () => {
            //     window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            // });

            let text = document.createElement('a-text');

                text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                text.setAttribute('scale', '10 10 10');
                text.setAttribute('position', '0 4 -10');
                text.setAttribute('look-at', '[gps-camera]');
                text.setAttribute('value', 'uiuiuiuiui');
                text.setAttribute('sound', 'on: click; src: #click-sound');
                text.setAttribute("animation__mouseenter", "property: scale; to: 2 2 2; dur: 300; startEvents: mouseenter");
                text.setAttribute("animation__mouseleave", "property: scale; to: 1 1 1; dur: 300; startEvents: mouseleave")

                text.addEventListener('loaded', () => {
                    window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                });

            scene.appendChild(plane);
            scene.appendChild(text);
            //scene.appendChild(sphere);

    });
};