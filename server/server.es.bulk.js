import { client } from './server.client'
import { readFileSync } from 'fs'

const bulkIndex = function bulkIndex(index, bodyData) {
    let bulkBody = []
  
    bodyData.forEach(item => {
      bulkBody.push({
        index: {
          _index: index
        }
      });
      bulkBody.push(item)
    });
  
    client.bulk({body: bulkBody})
    .then(response => {
      let errorCount = 0;
      response.body.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error)
        }
      })
      console.info(`🚀 Successfully Indexed: ${bodyData.length - errorCount}
      out of ${bodyData.length} items`);

    })
    .catch(console.err)
};

export const indexDocuments = (index, documents) => {
    // Load the data from local json file into elasticsearch bulk command
    // example: const articlesRaw = readFileSync('static/data.json')
    const bodyRaw = readFileSync(documents)
    const bodyData = JSON.parse(bodyRaw)
    console.log(`${bodyData.length} items parsed from data file`)
    bulkIndex(index, bodyData)
}