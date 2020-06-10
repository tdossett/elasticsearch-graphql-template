import { client } from './server.client'
import { elasticSearchSchema } from './server.es.schema'
import { vueelasticSearchSchema } from './server.es.schema'
import { blacksopediaSearchSchema } from './server.es.schema'
import { createIndex } from './server.es.createIndex'
import { createDocument } from './server.es.createDocument'
import { updateDocument } from './server.es.updateDocument'
import { deleteIndex } from './server.es.deleteIndex'
import { deleteDocument } from './server.es.deleteDocument'
import { indexDocuments } from './server.es.bulk'

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

// Elasticsearch search API using 'vue-elastic'
export const ElasticSearchClient = (body) => {
    // perform the actual search passing in the index, the search query and the type
    return client.search({ index:'vue-elastic', body:body, type:'characters_list' })
}

// Elasticsearch search API using 'blacksopedia'
export const BlacksopediaSearchClient = (body) => {
  // perform the actual search passing in the index, the search query and the type
  return client.search({ index:'blacksopedia', body:body, type:'characters_list' })
}

// Restful API for Elasticsearch query 'match_all' for all indexes
export const ApiElasticSearchClient = (req, res) => {
    // perform the actual search passing in the index, the search query and the type
    ElasticSearchClient({...elasticSearchSchema})
      .then(r => res.send(r.body.hits.hits))
      .catch(e => {
        console.error(e);
        res.send([]);
      });
  }

// Restful API for Elasticsearch query 'match_all' for all indexes
// for index "vueelatic" queries only
export const ApiVueElasticSearchClient = (req, res) => {
  // perform the actual search passing in the index, the search query and the type
  ElasticSearchClient({...vueelasticSearchSchema})
    .then(r => res.send(r.body.hits.hits))
    .catch(e => {
      console.error(e);
      res.send([]);
    });
}

// Restful API for Elasticsearch query 'match_all' for all indexes
// for index "blacksopedia" queries only
export const ApiBlacksopediaSearchClient = (req, res) => {
  // perform the actual search passing in the index, the search query and the type
  ElasticSearchClient({...blacksopediaSearchSchema})
    .then(r => res.send(r.body.hits.hits))
    .catch(e => {
      console.error(e);
      res.send([]);
    });
}

// $$$$ MUTATIONS for Blacksopedia $$$$
// Creates new Index
export const CreateIndex = (newIndex) => {
  createIndex(newIndex);
}

// Creates new Document for named Index
export const CreateDocument = (index, newDocument) => {
  createDocument(index, newDocument);
}

// Updates Document for named Index
export const UpdateDocument = (index, documentId, updatedDocument) => {
  updateDocument(index, documentId, updatedDocument);
}

// Delete Index
export const DeleteIndex = (index) => {
  deleteIndex(index);
}

// Delete Index Document
export const DeleteDocument = (index, documentId) => {
  deleteDocument(index, documentId);
}

// Bulk Insert Documents for name Index
export const IndexDocuments = (index, documents) => {
  indexDocuments(index, documents);
}

