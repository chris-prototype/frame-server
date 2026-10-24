const fs = require('fs/promises')
const DBM = require('./mongoose')
const FILE = 'articles.json'

async function main () {
  try {
    const contents = await fs.readFile(FILE, 'utf8')
    await parseFile(contents)
  } catch (err) {
    console.error(err)
  }
}

async function parseFile (contents) {
  try {
    const data = JSON.parse(contents)
    await loopThroughData(data)
  } catch (err) {
    console.error(err)
  }
}

async function loopThroughData (array) {
  for (let i = array.length - 1; i >= 0; i--) {
    try {
      await saveToDB(i, array[i])
    } catch (err) {
      console.error(err)
    }
  }
}

async function saveToDB (i, article) {
  await DBM.saveArticle(article)
  console.log('article saved', i)
}

main()