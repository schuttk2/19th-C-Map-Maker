// Leaflet map setup
const map = L.map('map', {
    center: [0, 0],
    zoom: 3
});

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
            const embeddedMap = L.map('embeddedMap').setView([50, 0], 3);
            const imageUrl = 'https://schuttk2.github.io/darwin-map/1800s-map.svg';
            const imageBounds = [[-100, -100], [100, 100]];
            L.imageOverlay(imageUrl, imageBounds).addTo(embeddedMap);
            const baseLayer = L.tileLayer('https://schuttk2.github.io/darwin-map/1800s-map.svg', {
                attribution: 'Le Monde Map'
            }).addTo(embeddedMap);    

            ${markers.map(marker => `
                L.marker([${marker.latlng.lat}, ${marker.latlng.lng}, {
                    icon: L.icon({
                        icon: 'https://schuttk2.github.io/darwin-map/Red_Icon.png'
                    })
                }])
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
        const colorCheckboxGroup = document.getElementById('colorCheckboxGroup');

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        let color;

        const checkboxes = colorCheckboxGroup.querySelectorAll('input[type="checkbox"]:checked');
        if(checkboxes.length > 0){
            color = checkboxes[0].value;
        }else{
            color = 'black';
        }

        if(!title){
            alert('Please enter a title for this pin.');
            return;
        }

        const markerIcon = L.icon({
            iconUrl: `Black_Icon.png`,
            iconSize: [31, 46], // size of the icon
            iconAnchor: [0, 46], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
        });

        if(color === 'red'){
            const markerIcon = L.icon({
                iconUrl: `Red_Icon.png`,
                iconSize: [31, 46], // size of the icon
                iconAnchor: [0, 46], // point of the icon which will correspond to marker's location
                popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
            });

            const newMarker = L.marker(e.latlng, {
                icon: markerIcon
            });
            map.addLayer(newMarker);
            newMarker.bindPopup(`<b>${title}</b><br>${description}`).openPopup();
    
            newMarker.on('contextmenu', function(e){
                map.removeLayer(newMarker);
            });
        }else if(color === 'orange'){
            const markerIcon = L.icon({
                iconUrl: `Orange_Icon.png`,
                iconSize: [31, 46], // size of the icon
                iconAnchor: [0, 46], // point of the icon which will correspond to marker's location
                popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
            });

            const newMarker = L.marker(e.latlng, {
                icon: markerIcon
            });
            map.addLayer(newMarker);
            newMarker.bindPopup(`<b>${title}</b><br>${description}`).openPopup();
    
            newMarker.on('contextmenu', function(e){
                map.removeLayer(newMarker);
            });
        }else{
            const markerIcon = L.icon({
                iconUrl: `Black_Icon.png`,
                iconSize: [31, 46], // size of the icon
                iconAnchor: [0, 46], // point of the icon which will correspond to marker's location
                popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
            });

            const newMarker = L.marker(e.latlng, {
                icon: markerIcon
            });
            map.addLayer(newMarker);
            newMarker.bindPopup(`<b>${title}</b><br>${description}`).openPopup();
    
            newMarker.on('contextmenu', function(e){
                map.removeLayer(newMarker);
            });
        }
        
        titleInput.value = '';
        descriptionInput.value = '';
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        map.off('click');

    })
}
