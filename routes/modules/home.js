const express = require('express')
const router = express.Router()

const UrlData = require('../../models/url')
const generateUrl = require('../modules/generateUrl')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async(req, res) => {
  try {
    const originalUrl = req.body.originalUrl.trim()
    let urlData = await UrlData.findOne({ originalUrl: originalUrl }).lean()
    
    if (urlData === null) {
      const shortUrl = await generateUrl(originalUrl)
      await UrlData.create({ originalUrl, shortUrl })
      urlData = await UrlData.findOne({ originalUrl }).lean()
    }
    urlData.shortUrl = `https://kiki-url-shortener.herokuapp.com/${urlData.shortUrl}`
    
    res.render('index', { urlData })
  } catch (error) {
      console.log(error)
  }
})

router.get('/:shortUrl', async(req, res) => {
  try {
    const shortUrl = req.params.shortUrl
    const urlData = await UrlData.findOne({ shortUrl }).lean()
    res.redirect(urlData.originalUrl)
    console.log(urlData)

  } catch (error) {
    console.log(error)
  }
})

module.exports = router