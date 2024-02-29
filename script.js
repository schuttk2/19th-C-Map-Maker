// Leaflet map setup
const map = L.map('map').setView([0, 0], 2); // Centered at (0,0) with zoom level 2

// Add a base layer (using a hard-coded image for demonstration)
const imageUrl = '1800s-map.jpg';
const imageBounds = [[-90, -180], [90, 180]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
    maxZoom: 18,
    attribution: 'Le Monde, principales decouvertes ' +
        '<a href="https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~22005~700037:Le-Monde%2C-principales-decouvertes-?sort=Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No&qvq=q:Le%20Monde%2C%20principales%20decouvertes;sort:Pub_List_No_InitialSort%2CPub_Date%2CPub_List_No%2CSeries_No;lc:RUMSEY~8~1&mi=0&trs=1#">David Rumsey Map Collection</a>, ',
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
    const modal = document.createElement('div');
    modal.id = 'embedCodeModal';
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeEmbedCodeModal()">&times;</span>
            <textarea id="embedCodeTextarea" readonly>${embedCode}</textarea>
            <button onclick="copyEmbedCode()">Copy Code</button>
        </div>    
    `;
    document.body.appendChild(modal);

    modal.style.display = 'block';
}

function closeEmbedCodeModal(){
    const modal = document.getElementById('embedCodeModal');
    if(modal){
        document.body.removeChild(modal);
    }
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

        <div id="embeddedMap" style="height: 400px;"></div>

        <script>
            const embeddedMap = L.map('embeddedMap').setView([${center.lat}, ${center.lng}], ${zoom});

            const baseLayer = L.tileLayer('https://schuttk2.github.io/darwin-map/1800s-map.jpg', {
                attribution: 'Le Monde Map'
            }).addTo(embeddedMap);

            ${markers.map(marker => `
                L.marker([${marker.latlng.lat}, ${marker.latlng.lng}])
                    .addTo(embeddedMap)
                    .bindPopup('${marker.title}');
            `).join('\n')}
        </script>

        </body>
        </html>
    `;

    return embedCode;
}

// Example: Add a button to dynamically add a pin to the map
document.getElementById('addPinButton').addEventListener('click', function () {
    alert('Click on the map to add a pin.');
    map.on('click', function (e) {
        const title = prompt('Enter the title for the pin:');
        const description = prompt('Enter the description for the pin:');

        const newMarker = L.marker(e.latlng).addTo(map);
        newMarker.bindPopup(`<b>${title}</b><br>${description}`).openPopup();

        map.off('click');
    });
});
