function loadAppointmentsPage(container) {
    container.innerHTML = '<h2>Your Appointments</h2><ul id="appointmentsList"></ul>';

    fetch(`${apiUrl}/appointments`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    })
        .then((response) => response.json())
        .then((appointments) => {
            const list = document.getElementById('appointmentsList');
            appointments.forEach((appointment) => {
                const li = document.createElement('li');
                li.textContent = `${appointment.type} on ${new Date(appointment.appointment_date).toLocaleString()}`;
                list.appendChild(li);
            });
        })
        .catch((error) => {
            container.innerHTML += `<p>Error fetching appointments: ${error.message}</p>`;
        });
}
