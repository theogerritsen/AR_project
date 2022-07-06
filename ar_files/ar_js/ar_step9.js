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
       // cube.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       // il faut imaginer une scène en 3D
       // la première valeur correspond à x, la deuxième à y (qui est l'altitude), et la troisième à z (qui est la profondeur)
       cube.setAttribute('position', '0 2 -5');
       cube.setAttribute('height', '2');
       cube.setAttribute('scale', '2 2 2');
        // ajout d'une texture personalisée, on  va chercher l'id de notre texture qu'on a définit dans la balise assets.
       cube.setAttribute("src", "#cubeTexture");
       // on ajoute une animation à notre objet (va aller de haut en bas en boucle)
       cube.setAttribute("animation", "property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true");
       //cube.setAttribute('material', 'color: yellow');

       cube.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

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
}