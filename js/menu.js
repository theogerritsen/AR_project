let sidebarBox = document.querySelector('#box');
let sidebarBtn = document.querySelector('#btn');

sidebarBtn.addEventListener('click', function(event) {

		if (this.classList.contains('active')) {
				this.classList.remove('active');
				sidebarBox.classList.remove('active');
		} else {
				this.classList.add('active');
				sidebarBox.classList.add('active');
		}
});
// changer le chemin selon le fichier
// on va chercher le nom du fichier dans lequel on est actuellement
var path = window.location.pathname;

console.log('chemin', path);

$(function(){
    $("#inst-menu").click(function(){
        document.querySelector('.inst-tab').classList.toggle("active");
        sidebarBtn.classList.remove("active");
        sidebarBox.classList.remove("active");
    });
    $("#geoguide-menu").click(function() {
        window.location.href = "https://igd.unil.ch/geoguidelsne/"
    });
    // changer si github ou pas
    if (path == "/AR_project/ar_files/step1.html") {
        $("#home-menu").click(function(){
        window.location.href = "tracking.html"
        });
        $("#back-menu").click(function(){
            window.location.href = "step1.html"
        });
        $("#begin-menu").click(function(){
            window.location.href = "../index.html"
        });

    }
    if (path == "/AR_project/ar_files/step2.html") {
        $("#home-menu").click(function(){
        window.location.href = "tracking.html"
        });
        $("#begin-menu").click(function(){
            window.location.href = "../index.html"
        });
    }
    if (path == "/AR_project/ar_files/ar_games/step1_game.html") {
        $("#home-menu").click(function() {
            window.location.href = "../tracking.html"
        });
        $("#back-menu").click(function(){
            window.location.href = "../step1.html"
        });
        $("#begin-menu").click(function(){
            window.location.href = "../../index.html"
        })
    }
    if (path == "/AR_project/ar_files/tracking.html") {
        $("#home-menu").click(function() {
            window.location.href = "../index.html"
        });
        
    }
    if (path == "/AR_project/ar_files/step3.html") {
        $("#home-menu").click(function() {
            window.location.href = "tracking.html"
        });
        $("#begin-menu").click(function () {
            window.location.href = "../index.html"
        });
    }
});
