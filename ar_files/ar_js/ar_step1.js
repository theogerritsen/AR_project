window.addEventListener("arjs-nft-loaded", (event) => {
    // Hide loading overlay
  });

var invocation = new XMLHttpRequest();
var url = 'https://raw.githubusercontent.com/theogerritsen/AR_project/main/ar_assets/essai_300dpi.fset';
var url1 = 'https://raw.githubusercontent.com/theogerritsen/AR_project/main/ar_assets/essai_300dpi.fset3';
var url2 = 'https://raw.githubusercontent.com/theogerritsen/AR_project/main/ar_assets/essai_300dpi.iset';

  const express = require('express');
  const app = express();


app.get('https://raw.githubusercontent.com/theogerritsen/AR_project/main/ar_assets/essai_300dpi.fset', function(request, response) {
  response.set('Access-Control-Allow-Origin', '*');
  response.sendFile(__dirname + '/message.json');
});

