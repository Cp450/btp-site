const express = require('express')
const router = express.Router()
const { supabase } = require('../lib/supabase')

// POST /api/devis_requests — soumettre une demande de devis
router.post('/', async (req, res) => {
  const { nom, tel, profile, email, categorie, budget, description, ville, quartier, surface } = req.body

  if (!nom || !tel) {
    return res.status(400).json({
      success: false,
      error: 'Les champs nom et tel sont requis.'
    })
  }

  try {
    const { data, error } = await supabase
      .from('devis_requests')
      .insert([{ nom, tel, profile, email, categorie, budget, description, ville, quartier, surface }])
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return res.status(500).json({ success: false, error: "Erreur lors de l'enregistrement." })
    }

    return res.status(201).json({ success: true, id: data.id })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ success: false, error: 'Erreur serveur inattendue.' })
  }
})

module.exports = router
