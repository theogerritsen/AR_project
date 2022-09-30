let scene = document.querySelector('#etape3');

console.log('coucou')

    const nft = document.createElement('a-nft');
    nft.setAttribute('registerevents', ''   );
    nft.setAttribute('name', 'panneau2');
    nft.setAttribute('type', 'nft');
    nft.setAttribute('url', 'https://raw.githubusercontent.com/theogerritsen/AR_project/main/ar_files/ar_gltf/step3/etape3_p7');
    nft.setAttribute('smooth', 'true');
    nft.setAttribute('smoothCount', '10');
    nft.setAttribute('smoothTolerance', '.01');
    nft.setAttribute('smoothThreshold', '5');
    //nft.setAttribute('raycaster', 'objects: .clickable');
    nft.setAttribute('emitevents', 'true');
    //nft.setAttribute('cursor', 'true: false; rayOrigin:mouse');

    const infoPlane = document.createElement('a-plane');
    infoPlane.setAttribute('height', '1');
    infoPlane.setAttribute('width', '1');
    infoPlane.setAttribute('position', '0 100 -170');
    infoPlane.setAttribute('rotation', '-100 0 0');
    infoPlane.setAttribute('scale', '100 100 100');
    infoPlane.setAttribute('src', 'ar_assets/textures/panneau_molasse.png');
    infoPlane.setAttribute('look-at', '[gps-camera]');
    infoPlane.setAttribute('sound', 'on: click; src: ar_assets/sounds/click.ogg');
    // infoPlane.setAttribute('event-set__mouseenter', 'scale: 2 2 2');
    // infoPlane.setAttribute('event-set__mouseleave', '');
    infoPlane.setAttribute('class', 'clickable');
    infoPlane.setAttribute('gesture-handler', 'minScale: 0.25; maxScale: 10');

    // on ajoute les NFT à la scène

    // et on ajoute chaque panneau à l'intérieur du nft
    scene.appendChild(nft);
    nft.appendChild(infoPlane);

    const nft2 = document.createElement('a-nft');
    nft2.setAttribute('name', 'panneau');
    nft2.setAttribute('type', 'nft');
    nft2.setAttribute('url', 'https://raw.githubusercontent.com/theogerritsen/AR_project/main/ar_files/ar_gltf/step3/etape3_p8');
    nft2.setAttribute('smooth', 'true');
    nft2.setAttribute('smoothCount', '10');
    nft2.setAttribute('smoothTolerance', '.01');
    nft2.setAttribute('smoothThreshold', '5');
    //nft.setAttribute('raycaster', 'objects: .clickable');
    nft2.setAttribute('emitevents', 'true');

    const infoPlane2 = document.createElement('a-plane');
    infoPlane2.setAttribute('height', '1');
    infoPlane2.setAttribute('width', '1');
    infoPlane2.setAttribute('position', '0 100 -170');
    infoPlane2.setAttribute('scale', '100 100 100');
    infoPlane2.setAttribute('rotation', '-100 0 0');
    infoPlane2.setAttribute('src', 'ar_assets/textures/panneau_molasse.png');
    infoPlane2.setAttribute('look-at', '[gps-camera]');
    infoPlane2.setAttribute('sound', 'on: click; src: ar_assets/sounds/click.ogg');
    // infoPlane.setAttribute('event-set__mouseenter', 'scale: 2 2 2');
    // infoPlane.setAttribute('event-set__mouseleave', '');
    infoPlane2.setAttribute('class', 'clickable');
    infoPlane2.setAttribute('gesture-handler', 'minScale: 0.25; maxScale: 10');

    scene.appendChild(nft2);
    nft2.appendChild(infoPlane2);
