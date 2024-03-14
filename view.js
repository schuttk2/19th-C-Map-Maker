// Leaflet map setup

// config map
let config = {
    minZoom: 2,
    maxZoom: 12,
  };
  // magnification with which the map will start
  const zoom = 3;
  // co-ordinates
  const lat = 50;
  const lng = 0;
  
 
const map = L.map('map', config).setView([lat, lng], zoom);

// Add a base layer (using a hard-coded image for demonstration)
const imageUrl = '1800s-map.svg',
    imageBounds = [
        [-100, -100],
        [100, 100]
    ];
L.imageOverlay(imageUrl, imageBounds).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
    maxZoom: 18,
    attribution: 'Le Monde, principales decouvertes ' +
        '<a href="https://tinyurl.com/hcjcp2cp" target="_blank">David Rumsey Map Collection</a>',
    id: 'le-monde'
}).addTo(map);
        
marker1 = new L.marker([11.350796722383672, -44.84169809679817]).bindPopup('<b>Test</b><br>This is a test').on('click', function () {
    map.setView(marker.latlng);
}).addTo(map);
