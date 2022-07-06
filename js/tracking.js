let mymap = L.map('map', {
    center: [46.520009, 6.629357],
    minZoom: 10,
	maxZoom: 18,
	zoom: 13
});

mymap.fitBounds([
    [46.5184540, 6.6240245],
    [46.5233845, 6.6360568]
]);

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

n = 0

let coords_dict = [];
for (const feature of arret.features){
    
    n++;
    
    let path = 'assets/marqueurs_etapes/etape' + n + '.png';
    let lat = feature.geometry.coordinates[0];
    let long = feature.geometry.coordinates[1];
    let coords = [long, lat];

    let url = feature.properties.url;
    
    coords_dict.push({
        
        key: "marqueur" + n,
        
        value: coords
    });

    let marqueur_etape = L.icon({
        iconUrl: path,
        iconSize: [50, 50],
        iconAnchor:   [25, 50]
    })
    let marqueur = L.marker(coords, {icon: marqueur_etape}).addTo(mymap)
};

L.geoJSON(sentier, {
    style: function(feature) {
        return {
            color: "blue",
            weight: 5
        };
    }
}).addTo(mymap)

let arPath = 'ar_files/';

const $divAR = $("#itin-rdv");

let step = [];
for (i = 1; i <= 10; ++i){
    this["step"+i] = "step" + i + ".html"
}

m = 0;

let step_coordinates = [];

lc._activate();

$divAR.append("<button class='itin-btn' id='rdv-btn' disabled>Rendez-vous à la prochaine étape</button>");

currentPos = null;
mymap.on('locationfound', function(evt){
    
    currentPos = [JSON.stringify(Math.round(evt.latlng.lat*10000)/10000), JSON.stringify(Math.round(evt.latlng.lng*10000)/10000)];
 
    let userPosition = '[' + currentPos[0] + ',' + currentPos[1] + ']';
    console.log("user position1: ", userPosition);
    
    
    for (var value in coords_dict) {

        markerPosition = '[' + JSON.stringify(Math.round(coords_dict[value].value[0]*10000)/10000) + ',' + JSON.stringify(Math.round(coords_dict[value].value[1]*10000)/10000) + ']';

        console.log("positions: ", userPosition, markerPosition)
        if (userPosition == markerPosition) {
            
            $("#itin-rdv #go-ar-btn").remove();
            $("#itin-rdv #rdv-btn").remove();
            
            $divAR.append("<button class='itin-btn' id='go-ar-btn'>Commencer le tour en réalité augmentée</button>");
            console.log("its a match");
            
            $(function(){
                $("#go-ar-btn").click(function(){
                    
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
            
            break;
        }
        else {
            
            $("#itin-rdv #go-ar-btn").remove();
            $("#itin-rdv #rdv-btn").remove();
            
            $divAR.append("<button class='itin-btn' id='rdv-btn' disabled>Rendez-vous à la prochaine étape</button>");
            console.log("its not a match");
        };
    };
});

