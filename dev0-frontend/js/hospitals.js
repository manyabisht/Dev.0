function loadNearbyHospitalsPage(container) {
    container.innerHTML = '<h2>Nearby Hospitals</h2><ul id="hospitalsList"></ul>';

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
            // Make sure apiUrl is correctly defined
            const apiUrl = "http://localhost:3000";  // Update to your actual backend URL if needed

            const response = await fetch(`${apiUrl}/hospitals/nearby`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lat: latitude, lng: longitude, radius: 10 }),
            });

            // Check if the response is okay (status 200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Check the response Content-Type to ensure it's JSON
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Expected JSON response, but received something else');
            }

            const hospitals = await response.json();

            // Check if hospitals is an array
            if (!Array.isArray(hospitals)) {
                throw new Error('Expected an array of hospitals');
            }

            const list = document.getElementById('hospitalsList');
            hospitals.forEach((hospital) => {
                const li = document.createElement('li');
                li.textContent = `${hospital.name} - ${hospital.address} (${hospital.distance.toFixed(2)} km)`;
                list.appendChild(li);
            });
        } catch (error) {
            container.innerHTML += `<p>Error fetching hospitals: ${error.message}</p>`;
            console.error(error);  // Log to console for debugging
        }
    });
}
