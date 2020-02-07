import { client } from './server.client'
import { readFileSync } from 'fs'

const bulkIndex = function bulkIndex(index, bodyData) {
    // let bulkBody = []
  
    // data.forEach(item => {
    //   bulkBody.push({
    //     index: {
    //       _index: index,
    //       _type: type
    //     }
    //   });
    //   bulkBody.push(item)
    // });
  
    // client.bulk({body: bulkBody})
    // .then(response => {
    //   let errorCount = 0;
    //   console.log('response', response)
    //   response.items.forEach(item => {
    //     if (item.index && item.index.error) {
    //       console.log(++errorCount, item.index.error)
    //     }
    //   })
    //   console.log(
    //     `Successfully indexed ${data.length - errorCount}
    //     out of ${data.length} items`
    //   )
    // })
    // .catch(console.err)


  const body = bodyData.flatMap(doc => [{ index: { _index: index } }, doc])

  const { body: bulkResponse } = client.bulk({ refresh: true, body })

  console.log('body', body)

  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      console.log('action', action)
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

  const { body: count } = client.count({ index: index })
  console.log(count)
};

export const indexDocuments = (index, documents) => {
    // Load the data from local json file into elasticsearch bulk command
    // example: const articlesRaw = readFileSync('static/data.json')
    const bodyRaw = readFileSync(documents)
    const bodyData = JSON.parse(bodyRaw)
    console.log(`${bodyData.length} items parsed from data file`)
    bulkIndex(index, bodyData)
}