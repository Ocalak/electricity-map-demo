// Initialize map
const map = L.map('map').setView([51.505, -0.09], 13);

// Add base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Test marker
L.marker([51.5, -0.09])
    .addTo(map)
    .bindPopup('First marker!');
