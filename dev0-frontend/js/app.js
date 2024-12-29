function showPage(page) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear content
    switch (page) {
        case 'login':
            loadLoginPage(content);
            break;
        case 'register':
            loadRegisterPage(content);
            break;
        case 'nearbyHospitals':
            loadNearbyHospitalsPage(content);
            break;
        case 'appointments':
            loadAppointmentsPage(content);
            break;
        case 'healthRecords':
            loadHealthRecordsPage(content);
            break;
        default:
            content.innerHTML = '<h2>Page not found</h2>';
    }
}
