const express = require('express')
const router = express.Router()

const photoControllers = require('../controllers/photoControllers')

router.get('/', photoControllers.home)
router.get('/images/add', photoControllers.addFormImage)

router.post('/images/add', photoControllers.saveImage)

router.get('/images/delete/:photo_id', photoControllers.deleteImages)

module.exports = router
