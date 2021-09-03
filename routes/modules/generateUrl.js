
function sample(arr) {
  let index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

function generateUrl() {
  const data = {
    lowerCaseLetters: 'abcdefghijklmnopqrstuvwxyz',
    upperCaseLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '1234567890'
  }
  const urlLength = 5
  let collection = []
  let shortUrl = ''
  Object.values(data).forEach(value => {
    collection = collection.concat(value.split(''))
  })
  for (let i = 1; i <= urlLength; i++ ) {
    shortUrl += sample(collection)
  }
  return `https://chi-url-shortener.herokuapp.com/${shortUrl}`
}

module.exports = generateUrl