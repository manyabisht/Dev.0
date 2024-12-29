const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabaseAuth = require('../middleware/auth');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// Get nearby hospitals
router.get('/nearby', async (req, res) => {
    try {
        const { latitude, longitude, radius } = req.query;
        
        const { data, error } = await supabase
            .rpc('get_nearby_hospitals', {
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
                radius_km: parseFloat(radius)
            });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get hospital details
router.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('hospitals')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;
        if (!data) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;