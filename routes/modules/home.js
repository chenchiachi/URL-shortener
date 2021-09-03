const express = require('express')
const router = express.Router()

const UrlData = require('../../models/url')
const generateUrl = require('../modules/generateUrl')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const originalUrl = req.body.originalUrl
  const shortUrl = generateUrl(originalUrl)
  return UrlData.create({ originalUrl, shortUrl })
    .then(() => res.render('index', { originalUrl, shortUrl }))
    .then(() => console.log(originalUrl, shortUrl))
    .catch(error => console.log(error))
})

module.exports = router