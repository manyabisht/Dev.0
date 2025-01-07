const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan'); // Import logging library

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Middleware: Logging with Morgan
app.use(morgan('dev'));

// Middleware: CORS and JSON Parsing
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test endpoint
app.get('/test', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .limit(1);

        if (error) throw error;

        res.json({ message: 'Supabase connection successful', data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Auth routes
app.post('/auth/register', async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { first_name, last_name }
            }
        });

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Define route to fetch nearby hospitals with validation
app.post('/hospitals/nearby', async (req, res) => {
    const { lat, lng, radius } = req.body;

    if (!lat || !lng || !radius) {
        return res.status(400).json({ error: 'Missing lat, lng, or radius' });
    }

    try {
        const { data, error } = await supabase.rpc('get_nearby_hospitals', {
            lat,
            lng,
            radius_km: radius,
        });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error fetching nearby hospitals:', error);
        res.status(500).json({ error: 'Failed to fetch hospitals' });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});
