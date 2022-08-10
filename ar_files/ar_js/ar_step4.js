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

// fonction pour changer de panneau informatif quand on clique le bouton
function change_plane(elem){
    $("#change").click(function(){
        if (elem.id == 'st_laurent1') {

            elem.id = 'st_laurent2';
            elem.setAttribute('src', '#st_laurent2');
        }

        else if (elem.id == 'st_laurent2') {

            elem.setAttribute('id', 'st_laurent3');
            elem.setAttribute('src', '#st_laurent3')
        }

        else if (elem.id == 'st_laurent3') {

            elem.setAttribute('id', 'st_laurent1');
            elem.setAttribute('src', '#st_laurent1');
        }
    })
};

function change_info(plane, info){
    $("#change").click(function(){
        if (plane.id == 'st_laurent1') {
            info.setAttribute('value', 'st_laurent1');
        }

        if (plane.id == 'st_laurent2') {
            info.setAttribute('value', 'st_laurent2');
        }

        if (plane.id == 'st_laurent3') {
            info.setAttribute('value', 'st_laurent3');
        }
    })
}

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
                plane.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                plane.setAttribute('height', '1');
                plane.setAttribute('width', '1.5');
                plane.setAttribute('scale', '10 10 10');
                plane.setAttribute('src', '#st_laurent1');
                plane.setAttribute('look-at', '[gps-camera]');
                plane.setAttribute('sound', 'on: click touchstart; src: #click-sound');
                plane.setAttribute('event-set__mouseenter', 'scale: 13 13 13');
                plane.setAttribute('event-set__mouseleave', 'scale: 10 10 10');

                change_plane(plane)

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

                text.setAttribute('id', 'information');
                text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                text.setAttribute('scale', '10 10 10');
                //let y = "position";
                // le position du text modifie tout jsp pourquoi
                //text.setAttribute('position', '0 20 0');
                text.setAttribute('look-at', '[gps-camera]');
                text.setAttribute('value', 'st_laurent1');
                text.setAttribute('sound', 'on: click touchstart; src: #click-sound');
                text.setAttribute('event-set__mouseenter', 'scale: 13 13 13');
                text.setAttribute('event-set__mouseleave', 'scale: 10 10 10');

                // let vector = text.getAttribute("position");

                // console.log(vector)

                // vector.setComponent(1, 10);

                // console.log(text.getAttribute("position"))

                

                //console.log(document.getElementById("information").getAttribute("value"))

                change_info(plane, text)

                text.addEventListener('loaded', () => {
                    window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                });
            
            let change = document.createElement('a-text');

            change.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            change.setAttribute('scale', '10 10 10');
            change.setAttribute('position', '0 -10 -30');
            change.setAttribute('look-at', '[gps-camera]');
            change.setAttribute('value', "Cliquez sur l'image pour la slide suivante");
            change.setAttribute('sound', 'on: click touchstart; src: #click-sound');
            change.setAttribute("animation__mouseenter", "property: scale; to: 20 20 20; dur: 300; startEvents: mouseenter");
            change.setAttribute("animation__mouseleave", "property: scale; to: 10 10 10; dur: 300; startEvents: mouseleave")

            change.addEventListener('loaded', () => {
                    window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                });
            

            scene.appendChild(plane);
            scene.appendChild(text);
            scene.appendChild(change);
            //scene.appendChild(sphere);

    });
};
