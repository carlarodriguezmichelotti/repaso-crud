const express = require('express')
const router = express.Router()

const Coaster = require('../models/coaster.model')

// Creación de nueva roller coaster
router.get('/new', (req, res, next) => res.render('coasters/new-coaster'))
router.post('/new', (req, res, next) => {
  const { name, description, inversions, length,park_id} = req.body

  Coaster.create({ name, description,inversions,length,active:true,park_id})
    .then(() => res.redirect('/'))
    .catch(err => console.log('Hubo un error:', err))
})

// Listado de roller coasters
router.get('/', (req, res, next) => {
  Coaster.find({})
    .populate('park_id')
    .then(allTheRides => res.render('coasters/coasters-index', { coasters: allTheRides }))
    .catch(err => console.log('Hubo un error:', err))
})

// Detalle de roller coasters
router.get('/:id', (req, res, next) => {
  const coasterId = req.params.id
  Coaster.findById(coasterId)
    .populate('park_id')
    .then(theWholeRide => res.render('coasters/coaster-details', { coaster: theWholeRide }))
    .catch(err => console.log('Hubo un error:', err))
})

// Eliminar roller coaster
router.post('/delete/:id', (req, res, next) => {
    Coaster.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/coasters'))
    .catch(function(err){
      console.log('Hubo un error:', err)
    })
})

module.exports = router
