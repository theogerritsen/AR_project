// montrer la place pépinet -- ok

// montrer la rue centrale -- ok
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

function toggleButton() {
    document.querySelector('.centered').classList.toggle("active");
}

// fonction pour changer de panneau informatif quand on clique le bouton

function change_plane(elem) {
    $("#change").click(function() {
        if (elem.id == 'info1') {
            elem.setAttribute('id', 'info2');
            elem.setAttribute('src', '#info2');
        }
        else if (elem.id == 'info2') {
            elem.setAttribute('id', 'info3');
            elem.setAttribute('src', '#info3')
        }
        else if (elem.id == 'info3') {
            elem.setAttribute('id', 'info4');
            elem.setAttribute('src', '#info4');
        }
        else if (elem.id == 'info4') {
            elem.setAttribute('id', 'info1');
            elem.setAttribute('src', '#info1');
        }
    })
}

function staticLoadPlaces() {
    return [
        {
            name: 'river',
            location: {
                lat: 46.52384019539211,
                lng: 6.633033340579409
            }
        },
        {
            name: 'info',
            location: {
                lat: 46.52344644483276,
                lng: 6.631961426747679
            }
        },
        {
            name: 'Place Pepinet',
            location: {
                lat: 46.521122597896664,
                lng: 6.6323745456259715
            }
        },
        {
            name: 'Rue Centrale',
            location: {
                lat: 46.520965737105385,
                lng: 6.633555052114807
            }
        },
        {
            name: 'Place de la Riponne',
            location: {
                lat: 46.523872169883575,
                lng: 6.633220323316099
            }
        },
        {
            name: 'm2',
            location: {
                lat: 46.52502994800139,
                lng: 6.579198931609544
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
            });
            scene.appendChild(river);

        }

        if (place.name == "info") {

            const plane1 = document.createElement('a-plane');
                plane1.setAttribute('id', 'info1');
                plane1.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                //plane1.setAttribute('scale', '10 10 0');
                plane1.setAttribute('height', '1');
                plane1.setAttribute('width', '1.5');
                plane1.setAttribute('src', '#info1');
                plane1.setAttribute('look-at', '[gps-camera]');
                //plane1.setAttribute('event-set__mouseleavle', 'scale: 10 10 10');

                change_plane(plane1);

                plane1.addEventListener('loaded', () => {
                    window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                });

                // on ajoute le bouton (info suivante) si le curseur est sur le panneau
                plane1.addEventListener('mouseenter', () => {
                    document.querySelector('.centered').classList.add('active');
                });
                // et on l'enlève si le curseur sort du panneau
                plane1.addEventListener('mouseleave', () => {
                    document.querySelector('.centered').classList.remove('active');
                });

                scene.appendChild(plane1);
        
        }

        // si les unités qu'on veut montrer sont des places,
        // alors on y met des pin et un texte au-dessus.

        if (place.name == 'Place Pepinet' || place.name == 'Rue Centrale' || place.name == 'Place de la Riponne') {
            const pin = document.createElement('a-entity');
            pin.setAttribute('id', 'pin');
            pin.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            pin.setAttribute('scale', '1 1 1');
            pin.setAttribute('gltf-model', '#pin');
            //pin.setAttribute("animation__mouseenter", "property: scale; to: 2 2 2; dur: 300; startEvents: mouseenter");
            //pin.setAttribute("animation__mouseleave", "property: scale; to: 1 1 1; dur: 300; startEvents: mouseleave");

            pin.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
            });



            scene.appendChild(pin);

            const pinText = document.createElement('a-text');
            pinText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            pinText.setAttribute('id', place.name);
            pinText.setAttribute('value', place.name);
            pinText.setAttribute('scale', '6 6 0');
            //pinText.setAttribute('position', '0 6 0');
            pinText.setAttribute('look-at', '[gps-camera]');

            pinText.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
            });


            scene.appendChild(pinText);

            // on agrandit le texte si le le user vise le pin

            pin.addEventListener('mouseenter', () => {
                pinText.setAttribute('scale', '12 12 0');
            });
    
            pin.addEventListener('mouseleave', () => {
                pinText.setAttribute('scale', '6 6 0');
            });
        }
        
    });
};