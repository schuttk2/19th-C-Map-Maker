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
        '<a href="https://tinyurl.com/hcjcp2cp" target="_blank">David Rumsey Map Collection</a>',
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
    //get all of the info on each marker, then somehow get them to view.html

    /*${markers.map(marker => `
                L.marker([${marker.latlng.lat}, ${marker.latlng.lng}], {icon: colorIcon})
                    .addTo(embeddedMap)
                    .bindPopup('${marker.title}');
            `).join('\n')}*/

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

        const radio = colorCheckboxGroup.querySelectorAll('input[type="radio"]:checked');
        if(radio.length > 0){
            color = radio[0].value;
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
        radio.forEach(radio => {
            radio.checked = false;
        });
        
        map.off('click');

    })
}

function insertHyperlink(descriptionInput, latlng) {
    const selection = getSelectedText();

    if (selection) {
        const url = prompt('Enter the URL for the hyperlink:');
        if(url) {
            const hyperlink = `<a href="${url}" target="_blank">${selection}</a>`;
            insertTextAtCursor(descriptionInput, hyperlink);
        }
    }
}

function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection && document.selection.type != 'Control') {
        return document.selection.createRange().text;
    }
    return '';
}

// Function to insert text at the current cursor position in an input field
function insertTextAtCursor(inputField, textToInsert) {
    const startPos = inputField.selectionStart;
    const endPos = inputField.selectionEnd;
    const textBefore = inputField.value.substring(0, startPos);
    const textAfter = inputField.value.substring(endPos, inputField.value.length);

    inputField.value = textBefore + textToInsert + textAfter;

    // Move the cursor to the end of the inserted text
    const newCursorPos = startPos + textToInsert.length;
    inputField.setSelectionRange(newCursorPos, newCursorPos);
    inputField.focus();
}