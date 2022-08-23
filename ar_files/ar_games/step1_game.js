window.onload = () => {
    let places = staticLoadPlaces();
    console.log(places);
    renderPlaces(places);
};

// setTimeout(function(){
//     let txt = document.querySelector('[gps-entity-place]').getAttribute('latitude');
//     alert(txt);
// },10000);

$(function(){
    $("#itin-btn").click(function(){
        window.location.href = "../../tracking.html"
    })
    $("#step1-btn").click(function(){
        window.location.href = "../step1.html"
    })
    $("#start-btn").click(function(){
        document.querySelector('.inst-tab').classList.toggle("active");
    });
    $(".btnx").click(function(){
        document.querySelector('.inst-tab').classList.toggle("active");
    });
    $(".bx-menu").click(function(){
        document.querySelector('.menu').classList.toggle("active");
    });
});

// geolocalisation de l'utilisateur
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    let crd = pos.coords;
    let user_lat = JSON.stringify(Math.round(crd.latitude*100000)/100000);
    let user_lng = JSON.stringify(Math.round(crd.longitude*100000)/100000);
    let position = user_lat + ', ' + user_lng;
    console.log(position);
  
    console.log('Votre position actuelle est :');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    console.log(`La précision est de ${crd.accuracy} mètres.`);
  }
  
  function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);
  

// on déclaire les variables avant les fonctions pour qu'elles soient globales
var clicked_btn;
var clicked_rock;
var user_score = 0;
var scoreDiv = document.getElementById('userScore');
// fonction pour le jeu
function toggleGame(rock_id) {
    // on va chercher l'id du bouton cliqué
    clicked_rock = rock_id;
    console.log(clicked_rock);
    // on ajoute les boutons quand le user clique sur la roche
    document.querySelector('.centered').classList.toggle('active');

};
function getBtnId(btn_id) {
        clicked_btn = btn_id;
        console.log('btn', clicked_btn)
        console.log('rock', clicked_rock)
        // si le bouton cliqué est le même que la roche
        if (clicked_btn === clicked_rock) {
            // on enlève les boutons
            document.querySelector('.centered').classList.toggle('active');
            // on met un message comme quoi c'est la bonne réponse
            alert('correct answer')
            // et on leur dit de passer au suivant
            // et on ajoute un score de +1
            user_score += 1;
            console.log(user_score);
            document.getElementById('userScore').innerHTML = 'Score: ' + user_score + '/3';

            // si le score du user est égal à 3 (donc toutes les bonnes
            // réponse, on lui dit de passer à l'étape suivante)
            // scoreDiv.insertAdjacentText('beforebegin', 'score');
            if (user_score == 3) {
                alert("Bravo ! Passez à l'étape suivante")
            }
        }
        // si c'est la mauvaise réponse on dit au user
        else {
            alert('try again')
        }
}
// function toggleGame(btn_id) {
//         let clicked_btn = btn_id;
//         console.log(clicked_btn)
//     }


function staticLoadPlaces() {
    return [
        {
            name: 'molasse',
            location: {
                lat: 46.513269263223904,
                lng: 6.648777000499241,
            }
        },
        {
            name: 'gneiss',
            location: {
                lat: 46.51332868747917,
                lng: 6.64950601280128,
            }
        },
        {
            name: 'calcaire',
            location: {
                lat: 46.51351142712949,
                lng: 6.648653070434376,
            }
        }
    ]
}
function renderPlaces(places) {

    let scene = document.querySelector('#game1');
    places.forEach((place) => {
        console.log(place.name)
        const latitude = place.location.lat;
        const longitude = place.location.lng;

        const placeCube = document.createElement('a-box');
        if (place.name == 'calcaire') {
            placeCube.setAttribute('id', 'calcaire');
            placeCube.setAttribute('value', '131313')
        }
        if (place.name == 'gneiss') {
            placeCube.setAttribute('id', 'gneiss');
            placeCube.setAttribute('value', '131313')
        }
        if (place.name == 'molasse') {
            placeCube.setAttribute('id', 'molasse');
            placeCube.setAttribute('value', '131313')
        }
        placeCube.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        placeCube.setAttribute('scale', '.5 .5 .5');
        placeCube.setAttribute('onclick', 'toggleGame(this.id)');

        if (place.name == 'calcaire') {
            placeCube.setAttribute('color', '#4CC3D9');
        };

        placeCube.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        const placeText = document.createElement('a-text');
        placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        placeText.setAttribute('value', place.name);
        placeText.setAttribute('scale', '3 3 3');
        placeText.setAttribute('look-at', '[gps-camera]')

        placeText.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        // scene.appendChild(placeText);
        scene.appendChild(placeCube);

        console.log(placeCube.querySelector('[gps-entity-place]'))

    });
};