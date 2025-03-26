// Map config
const config = {
    center: [50, 10],
    zoom: 4,
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};

// Initialize
const map = L.map('map').setView(config.center, config.zoom);
L.tileLayer(config.tileLayer, { attribution: '© OSM' }).addTo(map);

// Sample data (replace with real data later)
// Updated sample data with forecasts
const regions = [
    { 
        name: "France",
        lat: 48.85, 
        lng: 2.35, 
        co2: 120,
        forecast: generateRandomForecast()
    },
    { 
        name: "Germany",
        lat: 52.52, 
        lng: 13.40, 
        co2: 350,
        forecast: generateRandomForecast()
    },
    { 
        name: "UK",
        lat: 51.50, 
        lng: -0.12, 
        co2: 200,
        forecast: generateRandomForecast()
    }
];

// Random forecast generator (100-500 MW)
function generateRandomForecast() {
    return Math.floor(Math.random() * 400) + 100; // 100-500 MW
}

// Modified circle creation with forecast
regions.forEach(region => {
    L.circle([region.lat, region.lng], {
        color: getColor(region.co2),
        fillColor: getColor(region.co2),
        radius: 50000,
        fillOpacity: 0.6
    })
    .bindPopup(`
        <b>${region.name}</b><br>
        Current CO₂: ${region.co2}g/kWh<br>
        Load Forecast: ${region.forecast}MW
    `)
    .addTo(map);
});

// Color scale
function getColor(co2) {
    return co2 > 300 ? '#d73027' :
           co2 > 200 ? '#fc8d59' :
           co2 > 100 ? '#fee08b' :
                       '#91cf60';
}
// Legend control
const legend = L.control({ position: 'bottomright' });

legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = `
        <h4>CO2 Intensity (g/kWh)</h4>
        <div><span style="background:#91cf60"></span>0-100</div>
        <div><span style="background:#fee08b"></span>100-200</div>
        <div><span style="background:#fc8d59"></span>200-300</div>
        <div><span style="background:#d73027"></span>300+</div>
    `;
    return div;
};

legend.addTo(map);
// Add timestamp
const timestamp = new Date().toLocaleTimeString();

// Add timestamp control
const timeControl = L.control({ position: 'topleft' });
timeControl.onAdd = () => {
    const div = L.DomUtil.create('div', 'timestamp');
    div.innerHTML = `Last update: ${timestamp}`;
    return div;
};
timeControl.addTo(map);
