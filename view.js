
// Leaflet map setup
const readOnlyMap = L.map('readOnlyMap').setView([0, 0], 3);

// Add a base layer (using a hard-coded image for demonstration)
const imageUrl = '1800s-map.svg',
    imageBounds = [
        [-100, -100],
        [100, 100]
    ];
L.imageOverlay(imageUrl, imageBounds).addTo(readOnlyMap);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
    maxZoom: 18,
    attribution: 'Le Monde, principales decouvertes ' +
        '<a href="https://tinyurl.com/hcjcp2cp" target="_blank">David Rumsey Map Collection</a>',
    id: 'le-monde'
}).addTo(readOnlyMap);

// Hard-coded markers
const markers = [
    { latlng: [51.505, -0.09], title: 'Marker 1', description: 'Description 1'},
    { latlng: [51.51, -0.1], title: 'Marker 2', description: 'Description 2'}
    // Add more markers as needed
];

markers.forEach(marker => {
    L.marker(marker.latlng).addTo(readOnlyMap).bindPopup(`<b>${marker.title}</b><br>${marker.description}`);
});