const express = require('express')
const router = express.Router()

const Park = require('../models/park.model')

// Creación de nuevo park
router.get('/new', (req, res, next) => res.render('parks/new-park'))
router.post('/new', (req, res, next) => {

  const {name, description} = req.body

  Park.create({ name, description, active: true})
    .then(() => res.redirect('/'))
    .catch(function(err){
      console.log('Hubo un error:', err)
    })
  })

// Listado de parks
router.get('/', (req, res, next) => {
  Park.find({})
    .then(allTheParks => res.render('parks/parks-index', { parks: allTheParks }))
    .catch(err => console.log('Hubo un error:', err))
})

// Detalle de park
router.get('/:id', (req, res, next) => {
  const parkId = req.params.id
  Park.findById(parkId)
    .then(theWholePark => res.render('parks/park-details', { park: theWholePark }))
    .catch(err => console.log('Hubo un error:', err))
})

// Eliminar park
router.post('/delete/:id', (req, res, next) => {
  Park.findByIdAndRemove(req.params.id)
  .then(() => res.redirect('/parks'))
  .catch(function(err){
    console.log('Hubo un error:', err)
  })
})


module.exports = router
