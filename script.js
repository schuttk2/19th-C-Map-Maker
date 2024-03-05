// Leaflet map setup
const map = L.map('map').setView([0, 0], 2); // Centered at (0,0) with zoom level 2

// Add a base layer (using a hard-coded image for demonstration)
const imageUrl = 'https://schuttk2.github.io/darwin-map/1800s-map.jpg';
const imageBounds = [[-90, -180], [90, 180]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
    maxZoom: 18,
    attribution: 'Le Monde, principales decouvertes ' +
        '<a href="https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~22005~700037:Le-Monde%2C-principales-decouvertes-?sort=Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No&qvq=q:Le%20Monde%2C%20principales%20decouvertes;sort:Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No;lc:RUMSEY~8~1&mi=0&trs=1#" target="_blank">David Rumsey Map Collection</a>',
    id: 'le-monde'
}).addTo(map);

// Function to open About page modal
function openAboutPage() {
    document.getElementById('aboutModal').style.display = 'block';
}

// Function to close About page modal
function closeAboutPage() {
    document.getElementById('aboutModal').style.display = 'none';
}

// Function to open Help page modal
function openHelpPage() {
    document.getElementById('helpModal').style.display = 'block';
}

// Function to close Help page modal
function closeHelpPage() {
    document.getElementById('helpModal').style.display = 'none';
}

// Function to export and embed map
function exportAndEmbed() {
    const mapState = {
        center: map.getCenter(),
        zoom: map.getZoom(),
        markers: []
    };

    map.eachLayer(layer => {
        if(layer instanceof L.Marker){
            const markerInfo = {
                latlng: layer.getLatLng(),
                title: layer.getPopup().getContent()
            };
            mapState.markers.push(markerInfo);
        }
    });

    const embedCode = generateEmbedCode(mapState);

    openEmbedCodeModal(embedCode);
}

function openEmbedCodeModal(embedCode) {
    const textarea = document.getElementById('embedCodeTextarea');
    textarea.value = embedCode;
    const modal = document.getElementById('embedCodeModal');
    modal.style.display = 'block';
}

function closeEmbedCodeModal(){
    const modal = document.getElementById('embedCodeModal');
    modal.style.display = 'none';
}

function copyEmbedCode(){
    const textarea = document.getElementById('embedCodeTextarea');
    textarea.select();
    document.execCommand('copy');
    alert('Embed code copied to clipboard!');
}

function generateEmbedCode(mapState){
    const { center, zoom, markers } = mapState;

    const embedCode = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        </head>
        <body>
        <div id="embeddedMap"></div>
        <script>
            const embeddedMap = L.map('embeddedMap').setView([0, 0], 2);
            const imageUrl = 'https://schuttk2.github.io/darwin-map/1800s-map.jpg';
            const imageBounds = [[-90, -180], [90, 180]];
            L.imageOverlay(imageUrl, imageBounds).addTo(embeddedMap);
            const baseLayer = L.tileLayer('https://schuttk2.github.io/darwin-map/1800s-map.jpg', {
                attribution: 'Le Monde Map'
            }).addTo(embeddedMap);    

            ${markers.map(marker => `
                L.marker([${marker.latlng.lat}, ${marker.latlng.lng}])
                    .addTo(embeddedMap)
                    .bindPopup('${marker.title}');
            `).join('\n')}
        </script>
        <style>
            #embeddedMap {
                height: 400px;
            }
        </style>
        </body>
        </html>
    `;

    return embedCode;
}

function addPin(){
    alert('Click where you would like the pin to be on the map');
    map.on('click', function (e) {
        const titleInput = document.getElementById('pinTitle');
        const descriptionInput = document.getElementById('pinDescription');

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        if(!title){
            alert('Please enter a title for this pin.');
            return;
        }

        const newMarker = L.marker(e.latlng).addTo(map);
        newMarker.bindPopup(`<b>${title}</b><br>${description}`).openPopup();
        
        titleInput.value = '';
        descriptionInput.value = '';
        
        map.off('click');

    })
}
