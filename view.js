
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

// Hard-coded markers
const markers = [
    { latlng: [0, 0], title: 'Marker 1', description: 'Description 1'},
    { latlng: [51.51, -0.1], title: 'Marker 2', description: 'Description 2'}
    // Add more markers as needed
];

markers.forEach(marker => {
    L.marker(marker.latlng).addTo(map).bindPopup(`<b>${marker.title}</b><br>${marker.description}`);
});