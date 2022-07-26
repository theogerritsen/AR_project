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

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        // on va ajouter nos différentes textures dans la balise assets


        // on ajoute un cube jaune aux coordonnées indiquées
        let cube = document.createElement('a-box');
        cube.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        // il faut imaginer une scène en 3D
        // la première valeur correspond à x, la deuxième à y (qui est l'altitude), et la troisième à z (qui est la profondeur)
        cube.setAttribute('id', 'cube');
        cube.setAttribute('position', '0 2 -5');
        cube.setAttribute('height', '2');
        cube.setAttribute('scale', '3 3 3');
            // ajout d'une texture personalisée, on  va chercher l'id de notre texture qu'on a définit dans la balise assets.
        cube.setAttribute("src", "#cubeTexture");
        // on ajoute une animation à notre objet (va aller de haut en bas en boucle)
        cube.setAttribute("animation__position", "property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true");

        // on ajoute une animation qui trigger seulement si le user regarde l'objet
        // l'objet va avancer quand on le regarde
        cube.setAttribute("animation__mouseenter", "property: scale; to: 2.3 2.3 2.3; src: #brick-bump; dur: 300; startEvents: mouseenter");

        // il se remet ensuite en place quand on ne le regarde plus
        cube.setAttribute("animation__mouseleave", "property: scale; to: 2 2 2; src: #cubeTexture; dur: 300; startEvents: mouseleave");
        //cube.setAttribute('material', 'color: yellow');

        // on peut ajouter un événement si le cube est cliqué
        cube.addEventListener('click', () => {
            cube.setAttribute('scale', '10 10 10');
            console.log('coucou')
        });

        cube.setAttribute('sound', 'on: click; src: #click-sound');

        cube.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

       // on ajoute une sphère
       let sphere = document.createElement('a-sphere');
            sphere.setAttribute('gps-entity-place', `latitude: ${46.513}; longitude: ${6.648};`);
            sphere.setAttribute('position', '0 0 0');
            sphere.setAttribute('material', 'color: green');
            sphere.setAttribute('sound', 'on: click; src: #click-sound');

            sphere.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });


        // on ajoute du texte
        let text = document.createElement('a-text');
            text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            text.setAttribute('scale', '10 10 10');
            text.setAttribute('look-at', '[gps-camera]');
            text.setAttribute('value', 'Coucou toi');
            text.setAttribute('sound', 'on: click; src: #click-sound');
            text.setAttribute("animation__mouseenter", "property: scale; to: 20 20 20; dur: 300; startEvents: mouseenter");
            text.setAttribute("animation__mouseleave", "property: scale; to: 10 10 10; dur: 300; startEvents: mouseleave")

        text.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        let plane = document.createElement('a-plane');
            plane.setAttribute('id', 'st_laurent1');
            plane.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            plane.setAttribute('height', '1');
            plane.setAttribute('width', '1.5');
            plane.setAttribute('src', '#st_laurent1');
            plane.setAttribute('look-at', '[gps-camera]');
            plane.setAttribute('sound', 'on: click; src: #click-sound');
            plane.setAttribute('event-set__mouseenter', 'scale: 2 2 2');
            plane.setAttribute('event-set__mouseleave', 'scale: 1 1 1');

            console.log(plane.src);

            //if (plane.attributes)

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

       //scene.appendChild(cube);
       scene.appendChild(sphere);
       scene.appendChild(text);
       scene.appendChild(plane);
   });
};

