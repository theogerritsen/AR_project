let scene = document.querySelector('#etape3');

console.log('coucou')

for (var n = 0; n < 10; n++) {
    const nft = document.createElement('a-nft');
    nft.setAttribute('type', 'nft');
    nft.setAttribute('url', 'https://raw.githubusercontent.com/theogerritsen/AR_project/main/ar_files/ar_gltf/step3/etape3_p' + n);
    nft.setAttribute('smooth', 'true');
    nft.setAttribute('smoothCount', '10');
    nft.setAttribute('smoothTolerance', '.01');
    nft.setAttribute('smoothThreshold', '5');
    nft.setAttribute('raycaster', 'objects: .clickable');
    nft.setAttribute('emitevents', 'true');
    nft.setAttribute('cursor', 'true: false; rayOrigin:mouse');

    const infoPlane = document.createElement('a-plane');
    infoPlane.setAttribute('height', '1');
    infoPlane.setAttribute('width', '1');
    infoPlane.setAttribute('position', '0 100 -170');
    infoPlane.setAttribute('scale', '200 200 200');
    infoPlane.setAttribute('src', 'ar_assets/textures/panneau_molasse.png');
    infoPlane.setAttribute('look-at', '[gps-camera]');
    infoPlane.setAttribute('sound', 'on: click; src: ar_assets/sounds/click.ogg');
    // infoPlane.setAttribute('event-set__mouseenter', 'scale: 2 2 2');
    // infoPlane.setAttribute('event-set__mouseleave', '');
    infoPlane.setAttribute('class', 'clickable');
    infoPlane.setAttribute('gesture-handler', 'minScale: 0.25; maxScale: 10');

    scene.appendChild(nft);
    scene.appendChild(infoPlane);
}