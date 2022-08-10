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
            name: 'Panneau',
            location: {
                lat: 46.51335216333632,
                lng: 6.649697990550806,
            }
        }
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {

            // pour utiliser les différentes coordonnées
            // on va passer le tout dans une boucle if


            let latitude = place.location.lat;
            let longitude = place.location.lng;

            let panneau = document.createElement('a-plane');
                panneau.setAttribute('id', 'st_laurent1');
                panneau.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                panneau.setAttribute('height', '1');
                panneau.setAttribute('width', '1.5');
                panneau.setAttribute('position', '0 2 0');
                panneau.setAttribute('src', '#st_laurent1');
                panneau.setAttribute('look-at', '[gps-camera]');
                panneau.setAttribute('sound', 'on: click; src: #click-sound');
                panneau.setAttribute('event-set__mouseenter', 'scale: 2 2 2');
                panneau.setAttribute('event-set__mouseleave', 'scale: 1 1 1');

                panneau.addEventListener('click', () => {

                if (panneau.id == 'st_laurent1') {

                    panneau.id = 'st_laurent2';
                    panneau.setAttribute('src', '#st_laurent2');
                }

                else if (panneau.id == 'st_laurent2') {

                    panneau.setAttribute('id', 'st_laurent3');
                    panneau.setAttribute('src', '#st_laurent3')
                }

                else if (panneau.id == 'st_laurent3') {

                    panneau.setAttribute('id', 'st_laurent1');
                    panneau.setAttribute('src', '#st_laurent1');
                }
            });

            panneau.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });

            let text = document.createElement('a-text');

                text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                text.setAttribute('scale', '2 2 2');
                text.setAttribute('position', '0 4 -10');
                text.setAttribute('look-at', '[gps-camera]');
                text.setAttribute('value', 'Information blabla');
                text.setAttribute('sound', 'on: click; src: #click-sound');
                text.setAttribute("animation__mouseenter", "property: scale; to: 2 2 2; dur: 300; startEvents: mouseenter");
                text.setAttribute("animation__mouseleave", "property: scale; to: 1 1 1; dur: 300; startEvents: mouseleave")

                text.addEventListener('loaded', () => {
                    window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                });

            scene.appendChild(panneau);
            scene.appendChild(text);

    });
};