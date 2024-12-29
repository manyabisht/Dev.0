const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabaseAuth = require('../middleware/auth');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// Create appointment
router.post('/', supabaseAuth, async (req, res) => {
    try {
        const { hospital_id, appointment_date, type, notes } = req.body;
        
        const { data, error } = await supabase
            .from('appointments')
            .insert([{
                patient_id: req.user.id,
                hospital_id,
                appointment_date,
                type,
                notes
            }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user's appointments
router.get('/', supabaseAuth, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                *,
                hospitals (
                    name,
                    address
                )
            `)
            .eq('patient_id', req.user.id)
            .order('appointment_date', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update appointment
router.put('/:id', supabaseAuth, async (req, res) => {
    try {
        const { appointment_date, status, notes } = req.body;
        
        const { data, error } = await supabase
            .from('appointments')
            .update({ appointment_date, status, notes })
            .eq('id', req.params.id)
            .eq('patient_id', req.user.id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;