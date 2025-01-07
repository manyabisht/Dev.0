let map;
let markers = [];

async function initMap() {
    // Initialize Google Maps
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: -34.397, lng: 150.644 }
    });

    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                fetchNearbyHospitals(pos.lat, pos.lng);
            },
            () => {
                handleLocationError(true);
            }
        );
    } else {
        handleLocationError(false);
    }
}

async function fetchNearbyHospitals(lat, lng) {
    try {
        const response = await fetch('/hospitals/nearby', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat: lat,
                lng: lng,
                radius: 10
            })
        });

        const hospitals = await response.json();
        displayHospitals(hospitals);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('hospitals-list').innerHTML = 
            'Error loading hospitals. Please try again.';
    }
}

function displayHospitals(hospitals) {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    hospitals.forEach(hospital => {
        // Add marker to map
        const marker = new google.maps.Marker({
            position: { lat: hospital.latitude, lng: hospital.longitude },
            map: map,
            title: hospital.name
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="hospital-info">
                    <h3>${hospital.name}</h3>
                    <p>${hospital.address}</p>
                    <p>Phone: ${hospital.phone}</p>
                    <button onclick="bookAppointment('${hospital.id}')">Book Appointment</button>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });
}