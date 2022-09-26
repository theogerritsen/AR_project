// montrer la place pépinet
// montrer la rue centrale
// mettre un pin pour la place de la riponne
// montrer m2
// montrer ouchy et épalinge ?
window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

let stepNumber = Number(sessionStorage.getItem("stepNum"));

$(function() {
    $("#sentier-btn").click(function(){
        window.location.href = "tracking.html"
    });
    $("#jeu-btn").click(function(){
        document.querySelector('.inst-tab').classList.toggle("active");
    });
    $(".bx-menu").click(function(){
        document.querySelector('.menu').classList.toggle("active");
    });
});

function staticLoadPlaces() {
    return [
        {
            name: 'river',
            location: {
                lat: 46.52674755240061,
                lng: 6.579319798563212,
            }
        },
        {
            name: 'panneau1',
            location: {
                lat: 46.513357398896744,
                lng: 6.64929693971056,
            }
        },
        {
            name: 'place_pepinet',
            location: {
                lat: 46.527302871376286,
                lng: 6.57784007975565,
            }
        },
        {
            name: 'rue_centrale',
            location: {
                lat: 46.52615522490866,
                lng: 6.580411320389366,
            }
        },
        {
            name: 'riponne',
            location: {
                lat: 46.52720770161556,
                lng: 6.58044386773916,
            }
        },
        {
            name: 'm2',
            location: {
                lat: 46.52502994800139,
                lng: 6.579198931609544,
            }
        }
    ]
};
function renderPlaces(places) {

    let scene = document.querySelector('#step2');
    places.forEach((place) => {
        const latitude = place.location.lat;
        const longitude = place.location.lng;

        // puisque le code va faire une boucle sur toutes les coordonnées données,
        // il faut mettre une condition if pour afficher le bon objet au bon endroit
        // et pas que chaque objet soit render à chaque coordonnée

        if (place.name == "river") {

            const river = document.createElement('a-entity');

            river.setAttribute('id', 'river');
            river.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            river.setAttribute('scale', '1 1 1');
            river.setAttribute('rotation', '0 30 0');
            // river.setAttribute('position', '0 -0.3 0');
            river.setAttribute('gltf-model', '#river');

            river.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
            })

        }

        if (place.name == "panneau1") {

            const plane1 = document.createElement('a-plane');
                plane1.setAttribute('id', 'panneau1');
                plane1.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                plane1.setAttribute('height', '1');
                plane1.setAttribute('width', '1.5');
                plane1.setAttribute('scale', '10 10 10');
                plane1.setAttribute('src', '#panneau1');
                plane1.setAttribute('look-at', '[gps-camera]');
                plane1.setAttribute('event-set__mouseenter', 'scale: 13 13 13');
                plane1.setAttribute('event-set__mouseleavle', 'scale: 10 10 10');

                plane1.addEventListener('loaded', () => {
                    window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                })

                //scene.appendChild(plane1);
        
        }

        // si les unités qu'on veut montrer sont des places,
        // alors on y met des pin et un texte au-dessus.

        if (place.name == 'place_pepinet' || place.name == 'rue_centrale' || place.name == 'riponne') {
            const pin = document.createElement('a-entity');
            pin.setAttribute('id', 'pin');
            pin.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            pin.setAttribute('scale', '1 1 1');
            pin.setAttribute('gltf-model', '#pin');

            pin.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
            });

            scene.appendChild(pin);

            const pinText = document.createElement('a-text');
            pinText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            pinText.setAttribute('id', 'pinText');
            pinText.setAttribute('value', place.name);
            pinText.setAttribute('scale', '3 1 3');
            pinText.setAttribute('look-at', '[gps-camera]');

            pinText.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
            });

            scene.appendChild(pinText);
        }

        scene.appendChild(river);
        
    });
};