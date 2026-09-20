export function initMap() {
  const mapElement = document.getElementById('service-map');
  if (!mapElement || typeof L === 'undefined') return;

  // Coordinates for Airport Residential Area, Accra (Central and Premium)
  const accraLat = 5.614;
  const accraLng = -0.185;

  const map = L.map('service-map', {
    zoomControl: false,
    scrollWheelZoom: false
  }).setView([accraLat, accraLng], 10);

  // Use a clean, modern map tile layer (CartoDB Positron)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Add zoom control to bottom right
  L.control.zoom({
    position: 'bottomright'
  }).addTo(map);

  // Custom icon mimicking the brand's primary color
  const customIcon = L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="width: 24px; height: 24px; background-color: #f59e0b; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  // Add marker for office
  L.marker([accraLat, accraLng], { icon: customIcon }).addTo(map)
    .bindPopup('<b style="color: #111827;">BrightHaven Solar</b><br><span style="color: #6b7280;">Accra Operations</span>')
    .openPopup();
    
  // Add a 50km radius circle
  L.circle([accraLat, accraLng], {
    color: '#f59e0b',
    weight: 2,
    fillColor: '#f59e0b',
    fillOpacity: 0.05,
    radius: 50000 // 50km
  }).addTo(map);
}
