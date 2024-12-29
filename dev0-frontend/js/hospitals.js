function loadNearbyHospitalsPage(container) {
    container.innerHTML = '<h2>Nearby Hospitals</h2><ul id="hospitalsList"></ul>';

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
            const response = await fetch(`${apiUrl}/hospitals/nearby`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lat: latitude, lng: longitude, radius: 10 }),
            });
            const hospitals = await response.json();

            const list = document.getElementById('hospitalsList');
            hospitals.forEach((hospital) => {
                const li = document.createElement('li');
                li.textContent = `${hospital.name} - ${hospital.address} (${hospital.distance.toFixed(2)} km)`;
                list.appendChild(li);
            });
        } catch (error) {
            container.innerHTML += `<p>Error fetching hospitals: ${error.message}</p>`;
        }
    });
}
