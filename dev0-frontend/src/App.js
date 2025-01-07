import React, { useEffect, useState } from 'react';
import API from './services/api';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const testConnection = async () => {
            try {
                const response = await API.get('/test');
                setMessage(response.data.message);
            } catch (error) {
                setMessage('Error connecting to backend');
            }
        };

        testConnection();
    }, []);

    return (
        <div>
            <h1>Backend Integration Test</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
