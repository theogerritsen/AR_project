let mymap = L.map('map', {
    center: [46.520009, 6.629357],
    minZoom: 10,
	maxZoom: 18,
	zoom: 13
});

// fit bounds pour voir tout le sentier sur n'importe quel device
mymap.fitBounds([
    [46.5184540, 6.6240245],
    [46.5233845, 6.6360568]
])

const mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/emerald-v8/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlb2dlcnJpdHNlbiIsImEiOiJja3R2Zzkybzkwa25oMm5tcGp1MWY0enh1In0.n_ye_r9ELbLqxyWl-giSlA', {
    tileSize: 512,
    zoomOffset: -1,
    attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
    );

const osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  	attribution: '&copy; OpenStreetMap contributors'
});

mapbox.addTo(mymap);

lc = L.control.locate({

}).addTo(mymap);

// ajout des icones personalisés

///////////////////////////////////////////////////////////////////
////////// GESTION DES ARRETS /////////////////////////////////
////////////////////////////////////////////////////////////    

// ajout dynamique des marqueurs pour faire correspondre aux étapes

// on initialise n à 0
n = 0

// on crée un array vide pour accueillir les coordonnées de chaque marqueur

let coords_dict = [];
for (const feature of arret.features){
    // pour chaque feature trouvé (étape), on incrémente n de 1
    n++;
    // on utilise ce n avec le chemin relatif des icones de chaque étape
    let path = 'assets/marqueurs_etapes/etape' + n + '.png';
    let lat = feature.geometry.coordinates[0];
    let long = feature.geometry.coordinates[1];
    let coords = [long, lat];

    let url = feature.properties.url;
    
    // pour chaque coordonnée trouvée, on l'ajoute à notre array vide
    coords_dict.push({
        // avec comme clé "marqueur" + le numéro correspond
        key: "marqueur" + n,
        // avec comme valeur les coordonnées lat long contenus dans un array
        value: coords
    });

    let marqueur_etape = L.icon({
        iconUrl: path,
        iconSize: [50, 50],
        iconAnchor:   [25, 50]
    })
    let marqueur = L.marker(coords, {icon: marqueur_etape}).addTo(mymap)
};

// polyline du parcours à faire et ajout à la carte
L.geoJSON(sentier, {
    style: function(feature) {
        return {
            color: "blue",
            weight: 5
        };
    }
}).addTo(mymap)

let arPath = 'ar_files/';

// on ajout le div qui contiendra notre bouton dans une nouvelle constante
const $divAR = $("#itin-rdv");

// on crée 10 variable contenant le chemin de chaque fichier AR
let step = [];
for (i = 1; i <= 10; ++i){
    this["step"+i] = "step" + i + ".html"
}

m = 0;

let step_coordinates = [];

// function ChangeUrl(page, url) {
//     if (typeof (history.pushState) != "undefined"){
//         var obj = { Page: page, Url: url};
//         history.pushState(obj, obj.Page, obj.Url);

//     } else {
//         alert("Browster does not support HTML5");
//     }
// }




// console.log(coords_dict)
// initialisation du bouton Commencer le sentier
$(function(){
    $("#itin-btn").click(function(){

        window.history.pushState(
            
              null
            ,
            "",
            "index.html#tracking"
          );

        // ChangeUrl('tracking-mode', 'tracking-mode.html');
        // on ajoute la classe active au bouton s'il est appuyé

        // (function(window,undefined){
        //     History.Adapter.bind(window, 'statechange', function(){
        //         var State = History.getState();
        //         console.log(State);
        //     });
        
        //     History.pushState({state:1}, "State 1", "?state=1");
        // })(window);
        $("#itin-go").toggleClass('active');
        // $(this).toggleClass('active');
        // dès que le user a appuyé sur le bouton, on active le control locate
        lc._activate();
        // on ajoute un pop up : rendez-vous à la première étape si l'utilisateur n'est pas déjà sur place
        $divAR.append("<button class='itin-btn' id='rdv-btn' disabled>Rendez-vous à la prochaine étape</button>");
        // on va aller chercher la position en temps réel de l'utilisateur
        currentPos = null;
        mymap.on('locationfound', function(evt){
            // on arrondit les lat long avec 4   décimales avec Math.round()
            // on convertit la position du user en string avec JSON.stringify pour pouvoir comparer
            // la position de l'utilisateur et la position du marqueur
            currentPos = [JSON.stringify(Math.round(evt.latlng.lat*10000)/10000), JSON.stringify(Math.round(evt.latlng.lng*10000)/10000)];

            // il faut ensuite matcher la position de l'utilisateur avec la position des marqueurs (étapes)
            // pour cela, il faut laisser une certaine marge de précision pour que l'utilisateur n'ait pas
            // à être exactement au bon endroit
            // on arrondit nos lat long à 3 décimales avec Math.round(). 4 décimales en degré permettent
            // d'avoir une précision d'environ 7.8m à 45° de latitude, ce qui laisse en marge de manoeuvre
            // pour l'utilisateur
            let userPosition = '[' + currentPos[0] + ',' + currentPos[1] + ']';
            console.log("user position1: ", userPosition);
            // il faut matcher la position de l'utilisateur avec la position des marqueurs
            // on itère à travers le dictionnaire qui contient la position de chacun de nos marqueurs
            for (var value in coords_dict) {

                markerPosition = '[' + JSON.stringify(Math.round(coords_dict[value].value[0]*10000)/10000) + ',' + JSON.stringify(Math.round(coords_dict[value].value[1]*10000)/10000) + ']';

                console.log("positions: ", userPosition, markerPosition)
                if (userPosition == markerPosition) {
                    // on enlève le bouton à chaque itération pour qu'ils ne se superposent pas
                    $("#itin-rdv #go-ar-btn").remove();
                    // on enlève le bouton allez à la prochaine étape
                    $("#itin-rdv #rdv-btn").remove();
                    // si la position du user est la même que celle du marqueur
                    // on ajoute un bouton Go to AR
                    $divAR.append("<button class='itin-btn' id='go-ar-btn'>Commencer le tour en réalité augmentée</button>");
                    console.log("its a match");
                    // il faut faire en sorte de le bon AR trigger selon la localisation de
                    // l'utilisateur
                    // on a juste à travers un if avec les bonnes coordonnées

                    // fonction pour aller à la page de l'AR s'il est appuyé
                    $(function(){
                        $("#go-ar-btn").click(function(){
                            //window.location.href = "ar_files/step9.html"
                            if (userPosition == '[46.5228,6.6349]'){
                                window.location.href = arPath + step1;
                            }
                            if (userPosition == '[46.5229,6.6331]'){
                                window.location.href = arPath + step2;
                            }
                            if (userPosition == '[46.5230,6.6325]'){
                                window.location.href = arPath + step3;
                            }
                            if (userPosition == '[46.5223,6.6304]'){
                                window.location.href = arPath + step4;
                            }
                            if (userPosition == '[46.5207,6.6324]'){
                                window.location.href = arPath + step5;
                            }
                            if (userPosition == '[46.5207,6.6304]'){
                                window.location.href = arPath + step6;
                            }
                            if (userPosition == '[46.5223,6.6302]'){
                                window.location.href = arPath + step7;
                            }
                            if (userPosition == '[46.5191,6.6264]'){
                                window.location.href = arPath + step8;
                            }
                            if (userPosition == '[46.5131,6.6488]'){
                                window.location.href = arPath + step9;
                            }
                            if (userPosition == '[46.5139,6.6480]'){
                                window.location.href = arPath + step10;
                            }

                        })
                    })
                    // on arrête la boucle
                    break;
                }
                else {
                    // si les coordonnées ne match pas, on enlève le bouton AR
                    $("#itin-rdv #go-ar-btn").remove();
                    $("#itin-rdv #rdv-btn").remove();
                    // et on remet l'info qu'il faut aller à la prochaine étape
                    $divAR.append("<button class='itin-btn' id='rdv-btn' disabled>Rendez-vous à la prochaine étape</button>");
                    console.log("its not a match");
                };
            };
        });
    });
});


