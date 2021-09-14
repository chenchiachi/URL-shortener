const express = require('express')
const router = express.Router()

const UrlData = require('../../models/url')
const generateUrl = require('../modules/generateUrl')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const originalUrl = req.body.originalUrl.trim()
  UrlData.findOne({ originalUrl: originalUrl })
  .lean()
  .then(urlData => {
    if (urlData === null) {
      const shortUrl = generateUrl(originalUrl)
      return UrlData.create({ originalUrl, shortUrl }).then(() => {
          return UrlData.findOne({ originalUrl })
          .lean()
          .then(urlData => {
            return res.render('index', { urlData })
          })
        })
      }
      return res.render('index', { urlData })
    })
    .catch(error => console.log(error))
})

module.exports = router