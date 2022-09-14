let sidebarBox = document.querySelector('#box');
let sidebarBtn = document.querySelector('#btn');
// puisque le menu se trouve sur chaque page
// on ajoute ici une variable qui va gérer quel marqueur
// sont affichés si le jeu est complet

// on crée une variable qui nous dit si le user est en mode jeu
// ou pas
//var gameMode = false;


sidebarBtn.addEventListener('click', function(event) {

		if (this.classList.contains('active')) {
				this.classList.remove('active');
				sidebarBox.classList.remove('active');
		} else {
				this.classList.add('active');
				sidebarBox.classList.add('active');
		}
});

window.addEventListener('keydown', function(event) {

		if (sidebarBox.classList.contains('active') && event.keyCode === 27) {
				sidebarBtn.classList.remove('active');
				sidebarBox.classList.remove('active');
		}
});
// changer le chemin selon le fichier
$(function(){
    $("#inst-menu").click(function(){
        document.querySelector('.inst-tab').classList.toggle("active");
        sidebarBtn.classList.remove("active");
        sidebarBox.classList.remove("active");
    });
    // changer si github ou pas
    $("#home-menu").click(function(){
        window.location.href = "../../tracking.html"
    });
    $("#back-menu").click(function(){
        window.location.href = "../step1.html"
    });
});