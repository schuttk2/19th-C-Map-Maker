const queryParams = new URLSearchParams(window.location.search);
const storedMarkers = queryParams.get('markers');

// Leaflet map setup
const readOnlyMap = L.map('readOnlyMap').setView([0, 0], 3);

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

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve marker information from local storage
    const storedMarkers = markerInfo.mapState;

    // Check if there are stored markers
    if (storedMarkers) {
        // Parse the JSON string to get the array
        const markers = JSON.parse(storedMarkers);

        // Create a read-only map using Leaflet
        const readOnlyMap = L.map('readOnlyMap').setView([0, 0], 2);

        // Add base layer and markers based on retrieved data
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
            maxZoom: 18,
            attribution: 'Le Monde, principales decouvertes ' +
                '<a href="https://tinyurl.com/hcjcp2cp" target="_blank">David Rumsey Map Collection</a>',
            id: 'le-monde'
        }).addTo(readOnlyMap);

        markers.forEach(marker => {
            L.marker(marker.latlng)
                .addTo(readOnlyMap)
                .bindPopup(marker.title);
        });

        // Optionally, customize the map appearance for read-only mode
        // ...

        // Display the map
        // ...
    } else {
        // Handle case where there are no stored markers
        console.log('No markers found in local storage.');
    }
});