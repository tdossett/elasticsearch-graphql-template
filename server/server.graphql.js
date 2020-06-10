import { ElasticSearchClient, BlacksopediaSearchClient, CreateIndex, CreateDocument, UpdateDocument, DeleteIndex, DeleteDocument, IndexDocuments } from './server.elasticsearch';
import { elasticSearchSchema, blacksopediaSearchSchema } from './server.es.schema'
import { makeExecutableSchema } from 'graphql-tools'

// Construct a schema, using GraphQL schema language.
// Note: extend type Query used due to limit of '1' type Query per typeDefs.
const typeDefs = `
    type VueElastic {
        cast_name: String
        og_name: String
        url: String
    }

    type Blacksopedia {
        businessName: String
        firstName: String
        lastName: String
        website: String
    }

    type NewIndex {
        newIndex: String
    }

    type NewDocument {
        newDocument: String
    }

    type UpdatedDocument {
        documentId: String
    }

    type DeleteIndex {
        index: String
    }

    type DeleteDocument {
        documentId: String
    }

    type IndexDocuments {
        index: String
    }

    # this 'Complex Object' is used in 'createDocument' mutation:
    input newDocument {
        businessName: String
        firstname: String
        LastName: String
        address: String
        city: String
        state: String
        zip: String
        email: String
        website: String
        image: String
        description: String
        phone: String
    }

    # this 'Complex Object' is used in 'updateDocument' mutation:
    input updatedDocument {
        businessName: String
        firstName: String
        LastName: String
        address: String
        city: String
        state: String
        zip: String
        email: String
        website: String
        image: String
        description: String
        phone: String
    }

    # this schema allows the following query:
    type Query {
        vueelastics: [VueElastic]
        blacksopedias: [Blacksopedia]
        vueelastic (queryString: String): [VueElastic]
        blacksopedia (queryString: String): [Blacksopedia]
    }

    # this schema allows the following mutation:
    type Mutation {
        createIndex (newIndex: String): NewIndex
        createDocument (index: String, newDocument: newDocument): NewDocument
        updateDocument (index: String, documentId: String, updatedDocument: updatedDocument): UpdatedDocument
        deleteIndex (index: String): DeleteIndex
        deleteDocument (index: String, documentId: String): DeleteDocument
        indexDocuments (index: String, documents: String): IndexDocuments
    }
`;

// The root provides a resolver function for each API endpoint which references the ElasticSearch calls
// in Queries and Mutations.
const resolvers = {
    Query: {
        vueelastics: () => new Promise((resolve, reject) => {
            ElasticSearchClient({...elasticSearchSchema})
                .then(r => {
                    let _source = r.body.hits.hits;
                    _source.map((item, i) => _source[i] = item._source);

                    resolve(_source);
                });
            }),
        blacksopedias: () => new Promise((resolve, reject) => {
                BlacksopediaSearchClient({...blacksopediaSearchSchema})
                    .then(r => {
                        let _source = r.body.hits.hits;
                        _source.map((item, i) => _source[i] = item._source);
    
                        resolve(_source);
                    });
            }),
        vueelastic: (_, args) => new Promise((resolve, reject) => {
            // console.log('args', args)
            // argument 'queryString' requested by client (index.vue)
            let _query = args.queryString

            let vueelasticSearchSchema =  {
                size: 100,
                from: 0,
                query: {
                    multi_match: {
                        query: _query,
                        type: 'bool_prefix',
                        fields: ['cast_name', 'og_name']
                    }
                }
            }
            
            ElasticSearchClient({...vueelasticSearchSchema})
                .then(r => {
                    let _source = r.body.hits.hits;
                    _source.map((item, i) => _source[i] = item._source);

                    resolve(_source);
            });
        }),
        blacksopedia: (_, args) => new Promise((resolve, reject) => {
            // console.log('args', args)
            // argument 'queryString' requested by client (index.vue)
            let _query = args.queryString

            let blacksopediaSearchSchema =  {
                size: 100,
                from: 0,
                query: {
                    multi_match: {
                        query: _query,
                        type: 'bool_prefix',
                        fields: ['businessName', 'firstName', 'lastName', 'website']
                    }
                }
            }
            
            BlacksopediaSearchClient({...blacksopediaSearchSchema})
                .then(r => {
                    let _source = r.body.hits.hits;
                    _source.map((item, i) => _source[i] = item._source);

                    resolve(_source);
            });
        })        
    },
    Mutation: {
        createIndex: (_, args) => new Promise((resolve, reject) => {
            let _newIndex = args.newIndex;
            // console.log(_newIndex);
            
            CreateIndex(_newIndex);
            resolve(_newIndex);

            return _newIndex;
        }),
        createDocument: (_, args) => new Promise((resolve, reject) => {
            let _index = args.index;
            let _newDocument = args.newDocument;
            // console.log('_index',_index);
            // console.log('_newDocument', _newDocument);

            CreateDocument(_index, _newDocument);

            resolve(_newDocument);

            // change this to return object not string below
            return '_newDocument';
        }),
        updateDocument: (_, args) => new Promise((resolve, reject) => {
            let _index = args.index;
            let _documentId = args.documentId;
            let _updatedDocument = args.updatedDocument;
            // console.log('_index',_index);
            // console.log('_documentId', _documentId);
            // console.log('_updateDocument', _updateDocument);

            UpdateDocument(_index, _documentId, _updatedDocument);

            resolve(_documentId);

            // change this to return object not string below
            return '_documentId';
        }),
        deleteIndex: (_, args) => new Promise((resolve, reject) => {
            let _index = args.index;
            console.log('_index',_index);

            DeleteIndex(_index);

            resolve(_index);

            // change this to return object not string below
            return _index;
        }),
        deleteDocument: (_, args) => new Promise((resolve, reject) => {
            let _index = args.index;
            let _documentId = args.documentId;
            // console.log('_index',_index);
            // console.log('_documentId',_documentId);

            DeleteDocument(_index, _documentId);

            resolve (_documentId);

            // change this to return object not string below
            return  _documentId;
        }),
        indexDocuments: (_, args) => new Promise((resolve, reject) => {
            let _index = args.index;
            let _documents = args.documents;
            // console.log('_index',_index);
            // console.log('_documents',_documents);

            IndexDocuments(_index, _documents);

            resolve (_index);

            // change this to return object not string below
            return  _index;
        })
    }
}

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});