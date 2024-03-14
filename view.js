
// Leaflet map setup
const map = L.map('map').setView([0, 0], 3);

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
        
L.marker([11.350796722383672, -44.84169809679817]).addTo(map).bindPopup('<b>test</b><br>this is a test').openPopup();
        

L.marker([11.86735091145932, 3.482539093560622]).addTo(map).bindPopup('<b>test</b><br>this is a test').openPopup();


L.marker([-15.284185114076433, 45.129245326706204]).addTo(map).bindPopup('<b>test</b><br>this is a test').openPopup();