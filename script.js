window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: 'Magnemite',
           location: {
               lat: 46.513055,
               lng: 6.648658,
           }
       },
   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
    //    let latitude = place.location.lat;
    //    let longitude = place.location.lng;
    //    console.log(latitude)

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: 46.513055; longitude: 6.648658;`);
       model.setAttribute('gltf-model', 'assets/magnemite/scene.gltf');
       model.setAttribute('rotation', '0 180 0');
       model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '0.05 0.05 0.05');

       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}