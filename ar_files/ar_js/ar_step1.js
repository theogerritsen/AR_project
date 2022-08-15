
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
       }
   ];
}

let gest = 'gesture-handler'

function renderPlaces(places) {
    let scene = document.querySelector('#step1');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        // on va ajouter nos différentes textures dans la balise assets

        let molasse = document.createElement('a-entity');
        molasse.setAttribute('id', 'molasse');
        molasse.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        molasse.setAttribute('gltf-model', '#molasse');
        molasse.setAttribute('scale', '.3 .3 .3');
        molasse.setAttribute('position', '0 1.3 -5');
        //molasse.setAttribute('gesture-handler', 'locationBased: true');
        // molasse.setAttribute('event-set__mouseenter', 'class: kaka');
        // molasse.setAttribute('event-set__mouseleave', 'class: kiki');
        molasse.setAttribute('rotation', '0 0 0');
        //gneiss.setAttribute('rotate-on-mouseenter');
        molasse.setAttribute("animation__mouseenter", "property: scale; to: .6 .6 .6; dur: 300; startEvents: mouseenter");
        molasse.setAttribute("animation__mouseleave", "property: scale; to: .3 .3 .3; dur: 300; startEvents: mouseleave");
        //gneiss.setAttribute("animation__position", "property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true");
        molasse.setAttribute("animation__rotationenter", "property: object3D.rotation.y; to: 360; dur: 10000; loop: true; easing: linear; startEvents: mouseenter");
        molasse.setAttribute("animation__rotationleave", "property: object3D.rotation.y; to: 0; startEvents: mouseleave");


        

        molasse.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });



        // let molasse_anim = document.createElement("a-entity");
        // molasse_anim.setAttribute('raycaster', 'objects: .clickable');
        // molasse_anim.setAttribute('emitevents', 'true');
        // molasse_anim.setAttribute('cursor', 'fuse: false; rayOrigin: mouse;');
        // //molasse_anim.setAttribute('fill', 'backwards');

        // molasse.appendChild(molasse_anim);

        let gneiss = document.createElement('a-entity');
        gneiss.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        gneiss.setAttribute('id', 'gneiss');
        gneiss.setAttribute('gltf-model', '#gneiss');
        gneiss.setAttribute('scale', '.3 .3 .3');
        gneiss.setAttribute('position', '1 1.3 -5');
        //gneiss.setAttribute('gesture-handler', 'locationBased: true');
        gneiss.setAttribute('rotation', '0 0 0');
        //gneiss.setAttribute('rotate-on-mouseenter');
        gneiss.setAttribute("animation__mouseenter", "property: scale; to: .6 .6 .6; dur: 300; startEvents: mouseenter");
        gneiss.setAttribute("animation__mouseleave", "property: scale; to: .3 .3 .3; dur: 300; startEvents: mouseleave");
        //gneiss.setAttribute("animation__position", "property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true");
        gneiss.setAttribute("animation__rotationenter", "property: object3D.rotation.y; to: 360; dur: 10000; loop: true; easing: linear; startEvents: mouseenter");
        gneiss.setAttribute("animation__rotationleave", "property: object3D.rotation.y; to: 0; startEvents: mouseleave");
        //gneiss.setAttribute("event-set__mouseenter", 'property: rotation; to 0 360 0; dur 3000; loop: true');
        //gneiss.setAttribute('event-set__click', 'property: scale; to: .6 .6 .6; dur: 300;')
        //gneiss.setAttribute("animation__mouseenter", "property: rotation; to: 0 360 0; dur: 3000; loop: true; startEvents: mouseenter");

        gneiss.addEventListener('click', () => {
            console.log('jai ete clique')
        });
        gneiss.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        // let gneiss = document.createElement('a-entity');

        // gneiss.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        // gneiss.setAttribute('gltf-model', 'ar_gltf/step1/gneiss/scene.gltf');
        // gneiss.setAttribute('scale', '.3 .3 .3');
        // gneiss.setAttribute('gesture-handler', 'locationBased: true');

        // gneiss.addEventListener('loaded', () => {
        //     window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        // });


        // on ajoute du texte
        let text = document.createElement('a-text');
            text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            text.setAttribute('scale', '10 10 10');
            text.setAttribute('look-at', '[gps-camera]');
            text.setAttribute('position', '0 10 0');
            text.setAttribute('sound', 'on: click; src: #click-sound');
            text.setAttribute("animation__mouseenter", "property: scale; to: 20 20 20; dur: 300; startEvents: mouseenter");
            text.setAttribute("animation__mouseleave", "property: scale; to: 10 10 10; dur: 300; startEvents: mouseleave")

        text.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

       //scene.appendChild(text);
       scene.appendChild(molasse);
       scene.appendChild(gneiss);

   });
};

AFRAME.registerComponent('rotate-on-mouseenter', {
    schema: {
        to: {defaut: '0 360 0', type: 'vec3'}
    },

    init: function() {
        let data = this.data;
        let el = this.el;
        this.el.addEventListener('mouseenter', function() {
            el.object3D.rotation.copy(data.to);
        });
    }
});


