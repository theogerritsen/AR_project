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

// enregistrement d'un component pour l'utiliser plus tard directement dans la balise
AFRAME.registerComponent('scale-on-mouseenter', {
    schema: {
        to: {default: '1 1 1', type: 'vec3'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;
        this.el.addEventListener('mouseenter', function () {
            el.object3D.scale.copy(data.to);
        });
    }
});


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
        cube.setAttribute('position', '0 2 -5');
        cube.setAttribute('height', '2');
        cube.setAttribute('scale', '3 3 3');
            // ajout d'une texture personalisée, on  va chercher l'id de notre texture qu'on a définit dans la balise assets.
        cube.setAttribute("src", "#cubeTexture");
        // on ajoute une animation à notre objet (va aller de haut en bas en boucle)
        cube.setAttribute("animation__position", "property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true");

        // on ajoute une animation qui trigger seulement si le user regarde l'objet
        // l'objet va avancer quand on le regarde
        cube.setAttribute("animation__mouseenter", "property: scale; to: 2.3 2.3 2.3; dur: 300; startEvents: mouseenter");

        // il se remet ensuite en place quand on ne le regarde plus
        cube.setAttribute("animation__mouseleave", "property: scale; to: 2 2 2; dur: 300; startEvents: mouseleave")
        //cube.setAttribute('material', 'color: yellow');

        cube.setAttribute("scale-on-mouseenter");

        cube.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });


        // puisqu'on a créé un curseur qui correspond au centre de la caméra,
        // on peut agrandir notre objet lorsque l'utilisateur regarde cet objet avec 'mouseenter'
        // cube.addEventListener('mouseenter', function() {
        //     cube.setAttribute('scale', {x: 1, y: 1, z: 1});
        // });

       // on ajoute un environnement
    //    let environnement = document.createElement('a-entity');
    //    environnement.setAttribute('environment', 'preset: forest; dressingAmount: 500');

    //    environnement.addEventListener('loaded', () => {
    //     window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
    //    });

       // on ajoute une sphère
       let sphere = document.createElement('a-sphere');
       sphere.setAttribute('gps-entity-place', `latitude: ${46.513}; longitude: ${6.648};`);
       sphere.setAttribute('position', '0 0 0');
       sphere.setAttribute('material', 'color: green');

       sphere.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });


       // on ajoute du texte
       let text = document.createElement('a-text');
       text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       text.setAttribute('scale', '10 10 10');
       text.setAttribute('look-at', '[gps-camera]');
       text.setAttribute('value', 'Coucou toi');

       text.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(cube);
       scene.appendChild(sphere);
       scene.appendChild(text);
   });
};

