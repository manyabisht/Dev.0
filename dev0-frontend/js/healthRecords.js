async function loadHealthRecords(section) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/health-records/${section}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const records = await response.json();
        displayRecords(records, section);
    } catch (error) {
        console.error('Error:', error);
    }
}

function showSection(section) {
    loadHealthRecords(section);
}