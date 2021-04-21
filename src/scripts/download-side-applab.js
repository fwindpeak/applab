const axios = require('axios')
const fs = require('fs')
const Path = require('path')
const https = require('https')

const request = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

async function getData() {
  const res = await request.get('https://api.sidequestvr.com/v2/apps?limit=500&is_app_lab=true&has_oculus_url=true')
  return res.data
}

function writeData(data) {

}


async function downloadImage(url, path) {

  const writer = fs.createWriteStream(path)

  const response = await request({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

const run = async () => {
  console.log('read data')
  const data = await getData()


  const jsonPath = Path.resolve(__dirname, '../public/applab.json')
  fs.writeFileSync(jsonPath, JSON.stringify(data))
  console.log('write json ok')

  for (let item of data) {
    const fileName = `${item.apps_id}.jpg`
    const path = Path.resolve(__dirname, '../public/applab-images', fileName)
    if (fs.existsSync(path) === false) {
      console.log(`downloading ${path}`)
      await downloadImage(item.image_url, path)
    }
  }

  console.log('ok')
}

run()


