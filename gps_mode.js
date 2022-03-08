function startItin() {
    let previous_map = document.getElementById('map');
    previous_map.remove();
    const map_itin = new mapboxgl.Map({
        container: 'gps_mode', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [6.629357, 46.520009], // starting position
        zoom: 16, // starting zoom
        pitch: 60,
        bearing: -60
    });
}