$(function() {
    $("#sentier-btn").click(function() {
        window.location.href = "tracking.html"
    });
    $("#jeu-btn").click(function() {
        document.querySelector('.inst-tab').classList.toggle("active");
            document.querySelector('.img-tab').classList.toggle("active");
    });
    $("#img-btn").click(function() {
        document.querySelector('.img-tab').classList.toggle("active");
                // si le score est déjà affiché alors on ne toggle pas la classe "active"
        // pour éviter qu'il disparaisse
        if (document.querySelector('.score').classList.contains("active")) {
            return
        } else {
            document.querySelector('.score').classList.toggle("active");
        };
    });
    $(".bx-menu").click(function() {
        document.querySelector('.menu').classList.toggle("active");
    });
});

let scene = document.querySelector('#etape3');

let nft = document.createElement('a-nft');
nft.setAttribute('markerhandler', '');
nft.setAttribute('registerevents', ''   );
nft.setAttribute('name', 'panneau2');
nft.setAttribute('type', 'nft');
nft.setAttribute('url', 'https://raw.githubusercontent.com/theogerritsen/AR_project/main/ar_files/ar_gltf/step3/etape3_p2');
nft.setAttribute('smooth', 'true');
nft.setAttribute('smoothCount', '10');
nft.setAttribute('smoothTolerance', '.01');
nft.setAttribute('smoothThreshold', '5');
//nft.setAttribute('raycaster', 'objects: .clickable');
nft.setAttribute('emitevents', 'true');
//nft.setAttribute('cursor', 'true: false; rayOrigin:mouse');


const infoPlane = document.createElement('a-plane');
infoPlane.setAttribute('id', 'info1');
infoPlane.setAttribute('height', '1');
infoPlane.setAttribute('width', '1');
infoPlane.setAttribute('position', '0 0 0');
infoPlane.setAttribute('rotation', '-100 0 0');
infoPlane.setAttribute('scale', '100 100 100');
infoPlane.setAttribute('src', '#info1');
infoPlane.setAttribute('look-at', '[gps-camera]');
infoPlane.setAttribute('sound', 'on: click; src: ar_assets/sounds/click.ogg');
infoPlane.setAttribute('gesture-handler', 'minScale: 0.25; maxScale: 10');

infoPlane.addEventListener('mouseenter', () => {
    document.querySelector('.centered').classList.add('active');
    planeId = 'info1';
});

infoPlane.addEventListener('mouseleave', () => {
    document.querySelector('.centered').classList.remove('active');
});

scene.appendChild(nft);
nft.appendChild(infoPlane);

// on ajoute les NFT à la scène

// et on ajoute chaque panneau à l'intérieur du nft
// 
//nft.appendChild(nextImg);

let nft2 = document.createElement('a-nft');
nft2.setAttribute('markerhandler', '');
nft2.setAttribute('registerevents', ''   );
nft2.setAttribute('name', 'panneau');

nft2.setAttribute('type', 'nft');
nft2.setAttribute('url', 'https://raw.githubusercontent.com/theogerritsen/AR_project/main/ar_files/ar_gltf/step3/etape3_p4');
nft2.setAttribute('smooth', 'true');
nft2.setAttribute('smoothCount', '10');
nft2.setAttribute('smoothTolerance', '.01');
nft2.setAttribute('smoothThreshold', '5');
//nft.setAttribute('raycaster', 'objects: .clickable');
nft2.setAttribute('emitevents', 'true');


const infoPlane2 = document.createElement('a-plane');
infoPlane2.setAttribute('height', '1');
infoPlane2.setAttribute('width', '1');
infoPlane2.setAttribute('id', 'info2');
infoPlane2.setAttribute('position', '0 0 0');
infoPlane2.setAttribute('scale', '100 100 100');
infoPlane2.setAttribute('rotation', '-100 0 0');
infoPlane2.setAttribute('src', '#info2');
infoPlane2.setAttribute('look-at', '[gps-camera]');
infoPlane2.setAttribute('sound', 'on: click; src: ar_assets/sounds/click.ogg');
// infoPlane.setAttribute('event-set__mouseenter', 'scale: 2 2 2');
// infoPlane.setAttribute('event-set__mouseleave', '');
infoPlane2.setAttribute('class', 'clickable');
infoPlane2.setAttribute('gesture-handler', 'minScale: 0.25; maxScale: 10');

infoPlane2.addEventListener('mouseenter', () => {
    //alert('info2');
    //alert(planeId);
    document.querySelector('.centered').classList.add('active');

});

// infoPlane2.addEventListener('markerFound', () => {
//     //alert('info2');
//     //alert(planeId);
//     alert('coucou');
// });

infoPlane2.addEventListener('mouseleave', () => {
    document.querySelector('.centered').classList.remove('active');
});

scene.appendChild(nft2);
nft2.appendChild(infoPlane2);

let nft3 = document.createElement('a-nft');
nft3.setAttribute('markerhandler', '');
nft3.setAttribute('registerevents', ''   );
nft3.setAttribute('name', 'panneau3');
nft3.setAttribute('type', 'nft');
nft3.setAttribute('url', 'https://raw.githubusercontent.com/theogerritsen/AR_project/main/ar_files/ar_gltf/step3/etape3_p9');
nft3.setAttribute('smooth', 'true');
nft3.setAttribute('smoothCount', '10');
nft3.setAttribute('smoothTolerance', '.01');
nft3.setAttribute('smoothThreshold', '5');
//nft.setAttribute('raycaster', 'objects: .clickable');
nft3.setAttribute('emitevents', 'true');

const infoPlane3 = document.createElement('a-plane');
infoPlane3.setAttribute('height', '1');
infoPlane3.setAttribute('width', '1');
infoPlane3.setAttribute('id', 'info3');
infoPlane3.setAttribute('position', '0 100 -170');
infoPlane3.setAttribute('scale', '100 100 100');
infoPlane3.setAttribute('rotation', '-100 0 0');
infoPlane3.setAttribute('src', '#info3');
infoPlane3.setAttribute('look-at', '[gps-camera]');
infoPlane3.setAttribute('sound', 'on: click; src: ar_assets/sounds/click.ogg');
// infoPlane.setAttribute('event-set__mouseenter', 'scale: 2 2 2');
// infoPlane.setAttribute('event-set__mouseleave', '');
infoPlane3.setAttribute('class', 'clickable');
infoPlane3.setAttribute('gesture-handler', 'minScale: 0.25; maxScale: 10');


infoPlane3.addEventListener('mouseenter', () => {
    document.querySelector('.centered').classList.add('active');
});

infoPlane3.addEventListener('mouseleave', () => {
    document.querySelector('.centered').classList.remove('active');
});

scene.appendChild(nft3);
nft3.appendChild(infoPlane3);

$(function() {
    $("#change").click(function() {

        if (nftNum === 'nft1') {
            infoPlane.setAttribute('src', '#img2');
            document.getElementById('userScore').innerHTML = 'Image trouvée : 1/3';

        }

        if (nftNum === 'nft2') {
            infoPlane2.setAttribute('src', '#img3');
            document.getElementById('userScore').innerHTML = 'Images trouvées : 2/3';
        }
        if (nftNum === 'nft3') {
            document.getElementById('userScore').innerHTML = 'Images trouvées : 3/3';
        }
    })
    
})

// on crée une variable ou on mettre le numero du nft trouvé

let nftNum;

// on créer un nouvel événement qui change la variable en fonction
// du nft visé

AFRAME.registerComponent('markerhandler', {
    init: function () {
      nft.addEventListener('markerFound', () => {
        nftNum = 'nft1'
      });
      
      nft2.addEventListener('markerFound', () => {
        nftNum = 'nft2'
      });

      nft3.addEventListener('markerFound', () => {
        nftNum = 'nft3'
      });
    }
});



