const UrlData = require('../../models/url')

function sample(arr) {
  let index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

async function generateUrl() {
  try {
    const data = {
      lowerCaseLetters: 'abcdefghijklmnopqrstuvwxyz',
      upperCaseLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '1234567890'
    }
    const urlLength = 5
    let collection = []
    let shortUrl = 'https://chi-url-shortener.herokuapp.com/'
    Object.values(data).forEach(value => {
      collection = collection.concat(value.split(''))
    })
    for (let i = 1; i <= urlLength; i++ ) {
      shortUrl += sample(collection)
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