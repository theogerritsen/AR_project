
$(function(){
    $("#return-btn").click(function(){
        window.location.href = "../tracking.html"
    })
    $("#return-btn2").click(function(){
        window.location.href = "../tracking.html"
    })
    $("#game-btn").click(function(){
        window.location.href = "ar_games/step1_game.html"
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

$(function() {
    $(".btn").click(function(){
        document.querySelector('.info').classList.remove("molasse");
        document.querySelector('.info').classList.remove("gneiss");
        document.querySelector('.info').classList.remove("calcaire");
        document.getElementById("cursor").setAttribute('position', '0 0 -1');

    });
}); 


// fonction info div

function toggleActive(clicked_id) {

    // on va chercher notre div qui contiendra les informations
    let popUpDiv = document.querySelector('.info');

    let infoDiv = document.querySelector('.infoContent');

    let imgDiv = document.querySelector('.card-image');

    // document.getElementById("information").setAttribute('style', 'margin-left:'+ marginLeft.substring(1)+';width:'+pixWidth - margFloat+';');
    //document.getElementById("information").setAttribute('style', 'width:'+ widthInfoDiv.substring(1)+';');
    let molasse_text = 'aaaaaaaaaaLa molasse – une des roches utilisée pour la construction des bâtiments et des trottoires de la Cité';
    let gneiss_text = 'Le calcaire – une des roches utilisée pour la construction des bâtiments et des trottoires de la Cité';
    let calcaire_txt = 'Le calcaire – une des roches utilisée pour la construction des bâtiments et des trottoires de la Cité';


    // lorsque le div est activé, il a un offsetHeight de 30
    setTimeout(function(){
        let divHeight = getComputedStyle(document.querySelector(".info")).height;
        let cursor = document.getElementById("cursor");
        console.log(getComputedStyle(document.querySelector(".info")).height);
        // donc si notre div a un offsetHeight de 30, on monte le marqueur
        // pour qu'il soit toujours visible
        if (divHeight == '0px') {
            cursor.setAttribute('position', '0 0 -1');
        }
        // sinon on le remet au milieu de l'écran
        else {
            cursor.setAttribute('position', '0 0.07 -1');
        }
    }, 600);
    // si on clique sur un des asset, on monte le curseur pour qu'il soit encore visible
    //cursor.setAttribute('position', '0 0.07 -1');
    $('#information').animate({scrollTop: 0}, 'fast');


    if (clicked_id == 'molasse') {

        // si le div a deja une classe gneiss ou calcaire, on l'enlève
        popUpDiv.classList.remove("calcaire");
        popUpDiv.classList.remove("gneiss");
        // on ajoute notre classe molasse
        popUpDiv.classList.toggle("molasse");
        imgDiv.setAttribute('style', "background-image: url('ar_assets/etape1/molasse.jpg');");
        // on supprime le contenu actuel du div
        infoDiv.innerHTML = "";
        // on ajoute le contenu en lien avec la molasse
        infoDiv.append(molasse_text);

    }
    if (clicked_id == 'gneiss') {

        popUpDiv.classList.remove("molasse");
        popUpDiv.classList.remove("calcaire");

        popUpDiv.classList.toggle("gneiss");
        imgDiv.setAttribute('style', "background-image: url('ar_assets/etape1/gneiss.jpg');");

        infoDiv.innerHTML = "";
        
        infoDiv.append(gneiss_text);

    }
    if (clicked_id == 'calcaire') {

        popUpDiv.classList.remove("molasse");
        popUpDiv.classList.remove("gneiss");

        popUpDiv.classList.toggle("calcaire");
        imgDiv.setAttribute('style', "background-image: url('ar_assets/etape1/calcaire.jpg');");

        infoDiv.innerHTML = "";
        
        infoDiv.append(calcaire_txt);

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

        let gneiss = document.createElement('a-entity');
        gneiss.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        gneiss.setAttribute('id', 'gneiss');
        gneiss.setAttribute('onclick', 'toggleActive(this.id)');
        gneiss.setAttribute('gltf-model', '#gneiss-texture');
        gneiss.setAttribute('scale', '.3 .3 .3');
        gneiss.setAttribute('position', '1.5 1.3 -5');
        gneiss.setAttribute('rotation', '0 0 0');
        gneiss.setAttribute("animation__mouseenter", "property: scale; to: .6 .6 .6; dur: 300; startEvents: mouseenter");
        gneiss.setAttribute("animation__mouseleave", "property: scale; to: .3 .3 .3; dur: 300; startEvents: mouseleave");
        gneiss.setAttribute("animation__rotationenter", "property: object3D.rotation.y; to: 360; dur: 10000; loop: true; easing: linear; startEvents: mouseenter");
        gneiss.setAttribute("animation__rotationleave", "property: object3D.rotation.y; to: 0; startEvents: mouseleave");

        gneiss.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        let calcaire = document.createElement('a-entity');
        calcaire.setAttribute('id', 'calcaire');
        calcaire.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        calcaire.setAttribute('onclick', 'toggleActive(this.id)');
        calcaire.setAttribute('gltf-model', '#calcaire');
        calcaire.setAttribute('scale', '.3 .3 .3');
        calcaire.setAttribute('position', '-1.5 1.3 -5');
        calcaire.setAttribute('rotation', '0 0 0');
        calcaire.setAttribute("animation__mouseenter", "property: scale; to: .6 .6 .6; dur: 300; startEvents: mouseenter");
        calcaire.setAttribute("animation__mouseleave", "property: scale; to: .3 .3 .3; dur: 300; startEvents: mouseleave");
        calcaire.setAttribute("animation__rotationenter", "property: object3D.rotation.y; to: 360; dur: 10000; loop: true; easing: linear; startEvents: mouseenter");
        calcaire.setAttribute("animation__rotationleave", "property: object3D.rotation.y; to: 0; startEvents: mouseleave");

        calcaire.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });


        // on ajoute du texte
        let molasse_txt = document.createElement('a-text');
        molasse_txt.setAttribute('id', 'text-molasse');
        molasse_txt.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        molasse_txt.setAttribute('scale', '1 1 1');
        molasse_txt.setAttribute('font', 'dejavu');
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
        gneiss_txt.setAttribute('font', 'dejavu');
        gneiss_txt.setAttribute('value', 'gneiss');
        gneiss_txt.setAttribute('look-at', '[gps-camera]');
        gneiss_txt.setAttribute('position', '1.2 2.1 -5');
        gneiss_txt.setAttribute('sound', 'on: click; src: #click-sound');

            gneiss_txt.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        let calcaire_txt = document.createElement('a-text');
        calcaire_txt.setAttribute('id', 'text-calcaire');
        calcaire_txt.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        calcaire_txt.setAttribute('scale', '1 1 1');
        calcaire_txt.setAttribute('font', 'dejavu');
        calcaire_txt.setAttribute('value', 'calcaire');
        calcaire_txt.setAttribute('look-at', '[gps-camera]');
        calcaire_txt.setAttribute('position', '-2 2.1 -5');
        calcaire_txt.setAttribute('sound', 'on: click; src: #click-sound');

        calcaire_txt.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        let instructions = document.createElement('a-text');
        instructions.setAttribute('id', 'instructions_step1');
        instructions.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        instructions.setAttribute('scale', '1 1 1');
        instructions.setAttribute('font', 'dejavu');
        instructions.setAttribute('value', "Visez une roche pour plus d'information");
        instructions.setAttribute('look-at', '[gps-camera]');
        instructions.setAttribute('position', '-2 3.1 -5');


        scene.appendChild(molasse_txt);
        scene.appendChild(gneiss_txt);
        scene.appendChild(calcaire_txt);
        scene.appendChild(molasse);
        scene.appendChild(gneiss);
        scene.appendChild(calcaire);
        scene.appendChild(instructions);

});
};






