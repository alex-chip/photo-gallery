const photoControllers = {}
const Photo = require('../models/Photo')
const cloudinary = require('cloudinary')
const fs = require('fs-extra')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

photoControllers.home =  async (req, res) => {
  const photos = await Photo.find()
  console.log(photos)
  
  res.render('images', { photos })
}

photoControllers.addFormImage = async (req, res) => {
  const photos = await Photo.find()
  res.render('image_form', { photos })
}

photoControllers.saveImage = async (req, res) => {
  
  console.log(req.file)
  const { title, description } = req.body
  const result = await cloudinary.v2.uploader.upload(req.file.path)
  console.log(result)
  const newPhoto = new Photo({
    title,
    description,
    imageURL: result.secure_url,
    public_id: result.public_id
  })
  await newPhoto.save()
  await fs.unlink(req.file.path)
  res.redirect('/')
}

photoControllers.deleteImages = async (req, res) => {
  const { photo_id } = req.params
  const photo = await Photo.findByIdAndDelete(photo_id)
  const result = await cloudinary.v2.uploader.destroy(photo.public_id)
  console.log(result)
  res.redirect('/images/add')
}

module.exports = photoControllers
