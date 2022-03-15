window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};


// on peut ajouter tous nos lieux ici
// en leur donnant un nom et une position
function staticLoadPlaces() {
   return [
       {
           name: 'Magnemite',
           location: {
               lat: 46.51332034317901,
               lng: 6.648990291700301,
           }
       },
       {
           name: 'Magnemite2',
           location: {
               lat: 46.512944,
               lng: 6.647536,
           }
       }
   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('gltf-model', 'assets/magnemite/scene.gltf');
       model.setAttribute('rotation', '0 180 0');
       model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '0.1 0.1 0.1');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}