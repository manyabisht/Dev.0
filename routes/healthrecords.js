const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabaseAuth = require('../middleware/auth');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// Create health record
router.post('/', supabaseAuth, async (req, res) => {
    try {
        const { record_type, description, date, provider, attachments } = req.body;
        
        const { data, error } = await supabase
            .from('health_records')
            .insert([{
                patient_id: req.user.id,
                record_type,
                description,
                date,
                provider,
                attachments
            }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user's health records
router.get('/', supabaseAuth, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('health_records')
            .select('*')
            .eq('patient_id', req.user.id)
            .order('date', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get specific health record
router.get('/:id', supabaseAuth, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('health_records')
            .select('*')
            .eq('id', req.params.id)
            .eq('patient_id', req.user.id)
            .single();

        if (error) throw error;
        if (!data) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;