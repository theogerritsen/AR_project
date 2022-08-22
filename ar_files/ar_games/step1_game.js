window.onload = () => {
    let places = staticLoadPlaces();
    console.log(places);
    renderPlaces(places);
};

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
        placeCube.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        placeCube.setAttribute('scale', '.5 .5 .5');

        const placeText = document.createElement('a-text');
        placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        placeText.setAttribute('value', place.name);
        placeText.setAttribute('scale', '3 3 3');
        placeText.setAttribute('look-at', '[gps-camera]')

        placeText.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });
        scene.appendChild(placeText);
        scene.appendChild(placeCube);
    })
}