import { client } from './server.client'
import { readFileSync } from 'fs'

const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = []
  
    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: index,
          _type: type
        }
      });
      bulkBody.push(item)
    });
  
    client.bulk({body: bulkBody})
    .then(response => {
      let errorCount = 0;
      console.log('response', response)
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error)
        }
      })
      console.log(
        `Successfully indexed ${data.length - errorCount}
        out of ${data.length} items`
      )
    })
    .catch(console.err)
};

export const indexData = () => {
    // Load the data from local json file into elasticsearch bulk command
    const articlesRaw = readFileSync('static/data.json')
    const articles = JSON.parse(articlesRaw)
    console.log(`${articles.length} items parsed from data file`)
    bulkIndex('vue-elastic', 'characters_list', articles)
}