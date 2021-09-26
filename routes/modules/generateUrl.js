const UrlData = require('../../models/url')

async function generateUrl() {
  try {
    const urlLength = 5
    let shortUrl = ''
    const data = 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '1234567890'

    for (let i = 1; i <= urlLength; i++ ) {
      shortUrl += data[Math.floor(Math.random() * data.length)]
    }
    let urlData = await UrlData.findOne({shortUrl}).lean()
    if (urlData === null) {
      return shortUrl
    } else {
      return generateUrl()
    }
  
  } catch (error) {
    console.log(error)
  }
}

module.exports = generateUrl