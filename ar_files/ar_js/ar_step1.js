<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>GeoAR.js demo</title>
        <!-- AFRAME -->
        <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
        <script src="https://unpkg.com/aframe-template-component@3.x.x/dist/aframe-template-component.min.js"></script>
        <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
        <script src="https://unpkg.com/aframe-layout-component@4.x.x/dist/aframe-layout-component.min.js"></script>
        <script src="https://unpkg.com/aframe-event-set-component@5.x.x/dist/aframe-event-set-component.min.js"></script>
        <script src="https://unpkg.com/aframe-proxy-event-component@2.1.0/dist/aframe-proxy-event-component.min.js"></script>

        <!-- AR.js -->
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>

        <script src='https://cdnjs.cloudflare.com/ajax/libs/ajaxify/8.2.3/ajaxify.js' integrity='sha512-jipua8AH9JbOGVVx5NLMMm8UXqdF7RG+8kVIiVfjniUbMdfPlragzf32/wQ4N9g4d+m5euXVIKxX3h2g4auqSQ==' crossorigin='anonymous'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js' integrity='sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==' crossorigin='anonymous'></script>
        <link rel="stylesheet" href="ar_css/ar.css">
    </head>
  
    <body style="margin: 0; overflow: hidden;">
        <script src="ar_js/ar_step8.js"></script>

        <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
        >
        <!-- on stock nos assets, par ex textures, directement dans cette balise pour les utiliser plus tard-->
            <a-assets>
                <!-- ajout d'un son quand on clique sur le panneau -->
                <audio id="click-sound" src="../assets/sounds/click.ogg"></audio>
                <img id="cubes-thumb" src="../assets/textures/thumb-cubes.jpg">
            </a-assets>

        
            <a-camera gps-camera rotation-reader>
            <!-- on ajoute un curseur pour intéragir avec les objets.-->
            <a-cursor 
                id="cursor" 
                animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150" 
                animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500" 
                event-set__mouseenter="_event: mouseenter; color: springgreen" 
                event-set__mouseleave="_event: mouseleave; color: grey"
                color="grey">
            </a-cursor>
            
            </a-camera>

        </a-scene>
    <!-- <div class="centered">
      <button id="return-btn" class="return-btn">Retourner à l'itinéraire</button>
    </div> -->
    </body>
</html>


