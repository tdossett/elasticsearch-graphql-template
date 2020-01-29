import { client } from './server.client'
import { elasticSearchSchema } from './server.es.schema'
import { vueelasticSearchSchema } from './server.es.schema'

/**
 * TODO Ping the CLIENT to be sure
 *  *** ElasticSearch *** is up
 */

client.ping({}, { requestTimeout: 20000 }, (error, response) => {
    if (error) {
        console.error('ElasticSearch cluster is down!')
    } else {
        console.log('Everything is ok')
    }
});

export const ElasticSearchClient = (body) => {
    // perform the actual search passing in the index, the search query and the type
    return client.search({ index:'vue-elastic', body:body, type:'characters_list' })
}

export const ApiElasticSearchClient = (req, res) => {
    // perform the actual search passing in the index, the search query and the type
    ElasticSearchClient({...elasticSearchSchema})
      .then(r => res.send(r.body.hits.hits))
      .catch(e => {
        console.error(e);
        res.send([]);
      });
  }

  export const ApiVueElasticSearchClient = (req, res) => {
    // perform the actual search passing in the index, the search query and the type
    ElasticSearchClient({...vueelasticSearchSchema})
      .then(r => res.send(r.body.hits.hits))
      .catch(e => {
        console.error(e);
        res.send([]);
      });
  }
