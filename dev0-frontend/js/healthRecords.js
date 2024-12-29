function loadHealthRecordsPage(container) {
    container.innerHTML = '<h2>Your Health Records</h2><ul id="healthRecordsList"></ul>';

    fetch(`${apiUrl}/healthRecords`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    })
        .then((response) => response.json())
        .then((records) => {
            const list = document.getElementById('healthRecordsList');
            records.forEach((record) => {
                const li = document.createElement('li');
                li.textContent = `${record.record_type}: ${record.description}`;
                list.appendChild(li);
            });
        })
        .catch((error) => {
            container.innerHTML += `<p>Error fetching records: ${error.message}</p>`;
        });
}
