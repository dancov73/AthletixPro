const express = require('express');
const router = express.Router();
const { supabase } = require('../supabaseClient'); // Import supabase client

router.post('/login', async (req, res) => {
  try {
    // Log the request body for debugging
    console.log('Login request body:', req.body);

    // Assuming Django handles authentication, redirect to Django's login endpoint
    res.redirect('/django-login-endpoint');
  } catch (error) {
    console.error('Login failed:', error);

    // Log the error for debugging
    console.error('Request body:', req.body);

    // Il server Express invia il messaggio "Login failed"
    res.status(500).send('Login failed');
  }
});

// Ensure the module exports the router correctly
module.exports = router;
