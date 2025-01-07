async function loadAppointments() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('/appointments', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const appointments = await response.json();
        displayAppointments(appointments);
    } catch (error) {
        console.error('Error:', error);
    }
}

function bookAppointment(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const formData = {
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        doctor: document.getElementById('doctor').value,
        notes: document.getElementById('notes').value
    };

    fetch('/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Appointment booked successfully!');
        loadAppointments();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to book appointment');
    });
}
