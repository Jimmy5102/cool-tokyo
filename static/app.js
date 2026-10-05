const map = L.map("map").setView([35.681236, 139.767125], 12);

L.tileLayer(
    `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${window.MAPTILER_API_KEY}`,
    {
        tileSize: 512,
        zoomOffset: -1,
        attribution:
            '&copy; MapTiler &copy; OpenStreetMap contributors'
    }
).addTo(map);

// Temporary example cooling shelters
const shelters = [
    {
        name: "Tokyo Station Cooling Shelter",
        lat: 35.681236,
        lng: 139.767125
    },
    {
        name: "Shinjuku Cooling Shelter",
        lat: 35.6895,
        lng: 139.6917
    },
    {
        name: "Shibuya Cooling Shelter",
        lat: 35.6580,
        lng: 139.7016
    }
];

shelters.forEach((shelter) => {
    L.marker([shelter.lat, shelter.lng])
        .addTo(map)
        .bindPopup(`<b>${shelter.name}</b>`);
});