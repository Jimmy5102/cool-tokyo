const map = L.map("map").setView([35.681236, 139.767125], 12);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
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