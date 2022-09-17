window.onload = () => {
    let places = staticLoadPlaces();
    console.log(places);
    renderPlaces(places);
};


let stepNumber = Number(sessionStorage.getItem("stepNum"));

$(function(){
    $("#itin-btn").click(function(){
        window.location.href = "../../tracking.html"
    })
    $("#step1-btn").click(function(){
        window.location.href = "../step1.html"
    })
    $("#start-btn").click(function(){
        document.querySelector('.inst-tab').classList.toggle("active");
        // si le score est déjà affiché alors on ne toggle pas la classe "active"
        // pour éviter qu'il disparaisse
        if (document.querySelector('.score').classList.contains("active")) {
            return
        } else {
            document.querySelector('.score').classList.toggle("active");
        };
    });
    $(".btnx").click(function(){
        document.querySelector('.inst-tab').classList.toggle("active");
        if (document.querySelector('.score').classList.contains("active")) {
            return
        } else {
            document.querySelector('.score').classList.toggle("active");
        };
    });
    $(".bx-menu").click(function(){
        document.querySelector('.menu').classList.toggle("active");
    });
});

// on déclaire les variables avant les fonctions pour qu'elles soient globales
var clicked_btn;
var clicked_rock;
var user_score = 0;
var scoreDiv = document.getElementById('userScore');
// fonction pour le jeu
function toggleGame(rock_id) {
    //on va chercher les classes de nos trois pin géolocalisées
    // puis on va chercher l'attribut distanceMsg qui contient la distance
    // de l'utilisateur au marqueur en [m]
    var calcaireClass = document.querySelector('.calcaire').getAttribute('distanceMsg');
    var gneissClass = document.querySelector('.gneiss').getAttribute('distanceMsg');
    var molasseClass = document.querySelector('.molasse').getAttribute('distanceMsg');
    // on transforme les distances trouvées en int
    var intCalcaire = parseInt(calcaireClass);
    var intGneiss = parseInt(gneissClass);
    var intMolasse = parseInt(molasseClass);
    // on va chercher l'id du bouton cliqué
    clicked_rock = rock_id;
    // condition de distance pour le jeu:
    // si la roche cliquée est à une distance supérieure à 15m
    // alors on demande à l'utilisateur de s'approcher de la roche
    // si l'utilisateur est à moins de 15m, alors on affiche les boutons
    // et l'utilisateur peut jouer au jeu
    if ((clicked_rock == 'gneiss') && (intGneiss > 15)) {
        $(function(){
            $('#dialog').dialog({
                // on enlève le bouton fermer qu'on remplace par un bouton "OK"
                dialogClass: "no-close",
                buttons: [
                    {
                        text: "Ok !",
                        click: function() {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
            // on ajoute ce message au dessus du bouton (si c'est la bonne réponse)
            $('#dialog').html('Vous êtes trop éloigné de la roche ! Approchez-vous à mois de <b>15 m</b> pour jouer au jeu. <br> Vous êtes actuellement à <b>'+intGneiss+' m</b> de cette roche');
        });
    }
    else if ((clicked_rock == 'calcaire') && (intCalcaire > 15)) {
        $(function(){
            $('#dialog').dialog({
                // on enlève le bouton fermer qu'on remplace par un bouton "OK"
                dialogClass: "no-close",
                buttons: [
                    {
                        text: "Ok !",
                        click: function() {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
            // on ajoute ce message au dessus du bouton (si c'est la bonne réponse)
            $('#dialog').html('Vous êtes trop éloigné de la roche ! Approchez-vous à mois de <b>15 m</b> pour jouer au jeu. <br> Vous êtes actuellement à <b>'+intCalcaire+' m</b> de cette roche');
        });
    }
    else if ((clicked_rock == 'molasse') && (intMolasse > 15)) {
        $(function(){
            $('#dialog').dialog({
                // on enlève le bouton fermer qu'on remplace par un bouton "OK"
                dialogClass: "no-close",
                buttons: [
                    {
                        text: "Ok !",
                        click: function() {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
            // on ajoute ce message au dessus du bouton (si c'est la bonne réponse)
            $('#dialog').html('Vous êtes trop éloigné de la roche ! Approchez-vous à mois de <b>15 m</b> pour jouer au jeu. <br> Vous êtes actuellement à <b>'+intMolasse+' m</b> de cette roche');
        });
    }
    else {
        document.querySelector('.centered').classList.toggle('active');
    }
};
function getBtnId(btn_id) {
        // on va chercher l'id du bouton cliqué
        clicked_btn = btn_id;
        // si le bouton cliqué est le même que la roche + Btn
        if (clicked_btn === clicked_rock + 'Btn') {
            // on enlève les boutons
            document.querySelector('.centered').classList.toggle('active');

            // si le score du user est inférieur à 3
            if (user_score < 3) {
                // on ajoute 1 au score qu'on update sur l'HTML
                user_score += 1;
                document.getElementById('userScore').innerHTML = 'Score: ' + user_score + '/3';
                // on ajoute un dialog
                $(function(){
                    $('#dialog').dialog({
                        // on enlève le bouton fermer qu'on remplace par un bouton "OK"
                        dialogClass: "no-close",
                        buttons: [
                            {
                                text: "Ok !",
                                click: function() {
                                    $(this).dialog("close");
                                }
                            }
                        ]
                    });
                    // on ajoute ce message au dessus du bouton (si c'est la bonne réponse)
                    $('#dialog').html('Bien joué ! <br> Trouvez les autres roches pour gagner le jeu !')
                });
            }
            // si le score du user est égal à 3, alors on lui dit qu'il a tout trouvé et qu'il peut passer
            // à l'étape suivante et on ajoute 1 au stepNumber pour montrer
            // le bon nombre d'étapes sur la prochaine page si le user a choisi de jouer au jeu
            if (user_score == 3) {
                stepNumber = stepNumber + 1;
                $(function(){
                    $('#dialog').dialog({
                        dialogClass: "no-close",
                        buttons: [
                            {
                                text: "Ok !",
                                click: function() {
                                    $(this).dialog("close");
                                }
                            }
                        ]
                    });
                    $('#dialog').html("Vous avez tout trouvé ! Passez à l'étape suivante !");
                    // metrre ref pour étape 2
                });
            }
        }
        // si c'est la mauvaise réponse on le dit au user
        else {
            $(function(){
                $('#dialog').dialog({
                    dialogClass: "no-close",
                    draggable: false,
                    buttons: [
                        {
                            text: "Ok !",
                            click: function() {
                                $(this).dialog("close");
                            }
                        }
                    ]
                });
                $('#dialog').html('Mauvaise réponse !')
            });
        }
}

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

        const placeText = document.createElement('a-text');
        placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        placeText.setAttribute('value', place.name);
        placeText.setAttribute('scale', '3 1 3');
        placeText.setAttribute('look-at', '[gps-camera]')

        placeText.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        const pin = document.createElement('a-entity');
        pin.setAttribute('id', 'pin');
        pin.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        if (place.name == 'molasse') {
            pin.setAttribute('id', 'molasse');
            pin.setAttribute('class', 'molasse');
        }
        if (place.name == 'gneiss') {
            pin.setAttribute('id', 'gneiss');
            pin.setAttribute('class', 'gneiss');
        }
        if (place.name == 'calcaire') {
            pin.setAttribute('id', 'calcaire');
            pin.setAttribute('class', 'calcaire');
        }
        pin.setAttribute('scale', '.3 .3 .3');
        pin.setAttribute('onclick', 'toggleGame(this.id)');
        pin.setAttribute('gltf-model', '#pin');

        pin.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
        });

        //scene.appendChild(placeText);
        scene.appendChild(pin);

    });
};
