const map = L.map("map").setView(
    [35.681236, 139.767125],
    12
);

L.tileLayer(
    `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${window.MAPTILER_API_KEY}`,
    {
        tileSize: 512,
        zoomOffset: -1,
        attribution:
            '&copy; MapTiler &copy; OpenStreetMap contributors'
    }
).addTo(map);


// Load real Tokyo cooling shelter data
fetch("/api/shelters")
    .then(response => response.json())
    .then(shelters => {

        console.log(
            "Official shelters loaded:",
            shelters.length
        );

        shelters.forEach(shelter => {

            // V0.2: temporary geographic placement
            // based on city-level location.
            // Exact coordinates will be added in V0.3.
            const cityCoordinates = {
                "千代田区": [35.6940, 139.7536],
                "中央区": [35.6706, 139.7719],
                "港区": [35.6581, 139.7516],
                "新宿区": [35.6938, 139.7034],
                "文京区": [35.7081, 139.7522],
                "台東区": [35.7126, 139.7800],
                "墨田区": [35.7107, 139.8015],
                "江東区": [35.6730, 139.8171],
                "品川区": [35.6092, 139.7300],
                "目黒区": [35.6415, 139.6982],
                "大田区": [35.5613, 139.7160],
                "世田谷区": [35.6466, 139.6532],
                "渋谷区": [35.6618, 139.7041],
                "中野区": [35.7077, 139.6638],
                "杉並区": [35.6994, 139.6364],
                "豊島区": [35.7260, 139.7165],
                "北区": [35.7528, 139.7336],
                "荒川区": [35.7360, 139.7830],
                "板橋区": [35.7512, 139.7090],
                "練馬区": [35.7356, 139.6517],
                "足立区": [35.7750, 139.8045],
                "葛飾区": [35.7433, 139.8471],
                "江戸川区": [35.7068, 139.8683]
            };

            const coords =
                cityCoordinates[shelter.city];

            if (!coords) {
                return;
            }

            L.circleMarker(coords, {
                radius: 5
            })
            .addTo(map)
            .bindPopup(`
                <strong>${shelter.name}</strong><br>
                ${shelter.address}<br><br>

                <b>Hours:</b><br>
                ${shelter.hours}<br>

                <b>Capacity:</b>
                ${shelter.capacity}<br><br>

                <a
                    href="${shelter.url}"
                    target="_blank"
                >
                    Official website
                </a>
            `);
        });
    })
    .catch(error => {
        console.error(
            "Failed to load shelters:",
            error
        );
    });