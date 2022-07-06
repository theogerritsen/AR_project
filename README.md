# L'utilisation de l'AR pour les sentiers didactiques

Ce projet est élaboré dans le cadre de mon mémoire à l'Université de Lausanne, sous la direction de Christian Kaiser.

L'idée principale du projet est de développer une application utilisant la réalité augmentée (AR) dans le cadre d'un sentier didactique, basé sur le géoguide de l'UNIL. Ce genre de géovisualisation permet de superposer du contenu virtuel supplémentaire sur la réalité afin d'augmenter la perception de l'utilisateur. Dans le cadre d'un sentier didactique, l'AR permettrait à l'utilisateur de se promener le long d'un parcours prédéfini. Lorsque l'utilisateur arriverait à un point donné (localisé sur la carte intéractive), il y aurait possibilité d'utiliser la caméra intégrée sur le smartphone afin d'obtenir des informations supplémentaires quant à tel ou tel lieux, en superposant directement ces informations aux objets concernés.

# Etat de l'art

## Articles

# Outils utilisés

## AR.js

L'outil principal utilisé ici sera la bibliothèque AR.js, une bibliothèque JavaScript open source, développée en 2017, qui permet d'intégrer de la réalité augmentée directement dans une application web. Elle permet de développer une application AR en utilisant soit la détection d'image, la localisation de l'utilisateur ou encore la détection d'un marqueur prédifini. Il est possible de développer une application hybride qui utilise plusieurs de ces méthodes.
Nous allons ici surtout nous concentrer sur deux méthodes:

* [Location based](https://ar-js-org.github.io/AR.js-Docs/location-based/): cette méthode repose sur les coordonnées GPS de l'utilisateur afin d'afficher des informations géolocalisées.

* [Image tracking](https://ar-js-org.github.io/AR.js-Docs/image-tracking/): cette méthode repose sur la reconnaissance d'éléments visuels afin d'afficher de plus amples informations quant à cet objet.

* Une dernière méthode est proposée par AR.js que nous n'exploiterons pas ici : [Marker based](https://ar-js-org.github.io/AR.js-Docs/marker-based/). Cette méthode repose sur l'identification d'un marqueur (type QR code) afin d'afficher un élément en AR. Puisque notre application concerne un sentier didactique, il ne sera pas possible de disposer de marqueurs à travers la ville, même si cette dernière méthode est la plus fiable.

## A-Frame

[A-Frame](https://aframe.io/docs/1.3.0/introduction/) est un outil permettant de créer des expériences en réalité augmentée et en réalité virtuelle. Il s'agit d'un langage construit autours de l'HTML permettant de facilement créer des objets en trois dimensions à l'aide de différentes balises pré-définies.

## Applications AR déjà réalisée

### Pour les sentiers didactiques en Suisse

[Carcatchou](https://carcatchou.cn-froideville.ch/desktop.html) est une ballade à Froideville qui offre une expérience en réalité augmentée sur le thème de l'espace.

[Totemi](https://totemi.ch/news/un-sentier-didactique-autour-dun-biotope/) est une application mobile qui permet à l'utilisateur une expérience en réalité augmentée autours de différents sujets et à différents endroits.

[Novilé](https://www.fribourgregion.ch/fr/la-gruyere/sport-plein-air/novile-lac-de-la-gruyere-en-realite-augmentee/) une chasse aux trésors en réalité augmentée autours du Lac de Gruyère.

[StoriaBox](https://www.loisirs.ch/loisirs/21386/storiabox-castrum-d-yverdon) redonne vie au Castrum d'Yverdon en 3D.

### Autres applications en Réalité Augmentée

#### Education

[Complete Anatomy '21](https://apps.apple.com/app/complete-anatomy-platform-20/id1309253074?ls=1&mt=8) permet d'apprendre l'anatomie du corps humain en AR

[Sky Guide](https://apps.apple.com/app/sky-guide/id576588894?ls=1&mt=8) permet d'explorer le ciel nocturne et apprendre sur les étoiles qui nous entourent

[Physics Lab AR](https://apps.apple.com/app/physics-lab-ar/id1298984261?ls=1&mt=8) est une application permettant de faire des expériences scientifiques en AR

[PlantSnap: plant identifier](https://apps.apple.com/app/plantsnap-plant-identifier/id1451054346?ls=1&mt=8), [PlantNet](https://apps.apple.com/ch/app/plantnet/id600547573?l=fr) et [PictureThis](https://apps.apple.com/us/app/picturethis-plant-identifier/id1252497129) sont des applications permettant d'identifier diverses plantes avec une UI en AR.

#### Pratique

[AdobeScan](https://apps.apple.com/ch/app/adobe-scan-scanner-ocr-de-pdf/id1199564834?l=fr) permet de scanner des documents et de les exporter en format PDF en utilisant une UI en AR.

[Google Translate](https://apps.apple.com/us/app/google-translate/id414706506) possède une fonctionalité qui permet de traduire en temps réel un texte que l'on capture à la caméra. L'application supperposera alors la traduction en utilisant la police appropriée.

[IKEA Place](highlights.ikea.com/2017/ikea-place/) permet de visualiser les articles d'IKEA directement dans son appartement en utilisant l'AR

# Web App

Nous avons choisi de développer cette application directement sur le web, car cela présente plusieurs avantages : 

*
*
*

## Croquis de développement

![proj1](img/readme/proj_1.png)

![proj2](img/readme/proj_2.png)

![proj3](img/readme/proj_3.png)

![proj4](img/readme/proj_4.png)






