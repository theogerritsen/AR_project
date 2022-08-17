
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
};

// on va calculer la margin-left après 3 secondes (ar js met une
// margin-left négative mais prend du temps à charger, même après le load)

let intervalId = window.setTimeout(function() {
    let body = document.getElementsByTagName('body')[0];
    let style = window.getComputedStyle(body);
    let marginLeft =  style.getPropertyValue('margin-left');
    let margFloat = +(marginLeft.substring(1).slice(0, -2));
 
    document.getElementById("information").setAttribute('style', 'margin-left:'+ margFloat+'px; width:' + window.screen.width + 'px;');

}, 3000);


// fonction info div

function toggleActive(clicked_id) {

    // on va chercher notre div qui contiendra les informations

    let infoDiv = document.querySelector('.info');

    // let marginLeft = window.getComputedStyle(document.body).getPropertyValue('margin-left');
    // let widthInfoDiv = window.getComputedStyle(document.body).getPropertyValue('width');
    // let len = widthInfoDiv.length;
    // let pixWidth = +(widthInfoDiv.slice(0, -2));
    // let margFloat = +(marginLeft.substring(1).slice(0, -2));
    // console.log('pixwidht', pixWidth);
    // console.log('margin', margFloat);
    // let sum = pixWidth - margFloat;
    // console.log(sum);
    // console.log(widthInfoDiv.length);

    // document.getElementById("information").setAttribute('style', 'margin-left:'+ marginLeft.substring(1)+';width:'+pixWidth - margFloat+';');
    //document.getElementById("information").setAttribute('style', 'width:'+ widthInfoDiv.substring(1)+';');
    let molasse_text = 'je suis de la molasse';
    let gneiss_text = 'je suis du gneiss';


    if (clicked_id == 'molasse') {

        // si le div a deja une classe gneiss ou calcaire, on l'enlève
        infoDiv.classList.remove("gneiss");
        infoDiv.classList.remove("calcaire");
        // on ajoute notre classe molasse
        infoDiv.classList.toggle("molasse");
        // on supprime le contenu actuel du div
        infoDiv.innerHTML = "";
        // on ajoute le contenu en lien avec la molasse
        infoDiv.append(molasse_text);

    }
    if (clicked_id == 'gneiss') {

        infoDiv.classList.remove("molasse");
        infoDiv.classList.remove("calcaire");

        infoDiv.classList.toggle("gneiss");

        infoDiv.innerHTML = "";
        
        infoDiv.append(gneiss_text);

    }
    //console.log(clicked_id)
}

function renderPlaces(places) {
    let scene = document.querySelector('#step1');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        // on va ajouter nos différentes textures dans la balise assets

        let molasse = document.createElement('a-entity');
        molasse.setAttribute('id', 'molasse');
        molasse.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        molasse.setAttribute('onclick', 'toggleActive(this.id)');
        molasse.setAttribute('gltf-model', '#molasse');
        molasse.setAttribute('scale', '.3 .3 .3');
        molasse.setAttribute('position', '0 1.3 -5');
        molasse.setAttribute('rotation', '0 0 0');
        molasse.setAttribute("animation__mouseenter", "property: scale; to: .6 .6 .6; dur: 300; startEvents: mouseenter");
        molasse.setAttribute("animation__mouseleave", "property: scale; to: .3 .3 .3; dur: 300; startEvents: mouseleave");
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
        gneiss.setAttribute('onclick', 'toggleActive(this.id)');
        gneiss.setAttribute('gltf-model', '#gneiss-texture');
        gneiss.setAttribute('scale', '.3 .3 .3');
        gneiss.setAttribute('position', '1 1.3 -5');
        gneiss.setAttribute('rotation', '0 0 0');
        gneiss.setAttribute("animation__mouseenter", "property: scale; to: .6 .6 .6; dur: 300; startEvents: mouseenter");
        gneiss.setAttribute("animation__mouseleave", "property: scale; to: .3 .3 .3; dur: 300; startEvents: mouseleave");
        gneiss.setAttribute("animation__rotationenter", "property: object3D.rotation.y; to: 360; dur: 10000; loop: true; easing: linear; startEvents: mouseenter");
        gneiss.setAttribute("animation__rotationleave", "property: object3D.rotation.y; to: 0; startEvents: mouseleave");

        gneiss.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        // on ajoute du texte
        let molasse_txt = document.createElement('a-text');
        molasse_txt.setAttribute('id', 'text-molasse');
        molasse_txt.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        molasse_txt.setAttribute('scale', '1 1 1');
        molasse_txt.setAttribute('value', 'molasse');
        molasse_txt.setAttribute('look-at', '[gps-camera]');
        molasse_txt.setAttribute('position', '-.5 2.1 -5');
        molasse_txt.setAttribute('sound', 'on: click; src: #click-sound');

        molasse_txt.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        let gneiss_txt = document.createElement('a-text');
        gneiss_txt.setAttribute('id', 'text-gneiss');
        gneiss_txt.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        gneiss_txt.setAttribute('scale', '1 1 1');
        gneiss_txt.setAttribute('value', 'gneiss');
        gneiss_txt.setAttribute('look-at', '[gps-camera]');
        gneiss_txt.setAttribute('position', '.7 2.1 -5');
        gneiss_txt.setAttribute('sound', 'on: click; src: #click-sound');

            gneiss_txt.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(molasse_txt);
        scene.appendChild(gneiss_txt);
        scene.appendChild(molasse);
        scene.appendChild(gneiss);

        gneiss.addEventListener('click', () => {

            console.log('jai ete clique')
        });

});
};






