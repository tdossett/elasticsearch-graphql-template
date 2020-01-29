import { ElasticSearchClient } from './server.elasticsearch';
import { elasticSearchSchema } from './server.es.schema'
import { makeExecutableSchema } from 'graphql-tools'

// Construct a schema, using GraphQL schema language.
// Note: extend type Query used due to limit of '1' type Query per typeDefs.
const typeDefs = `
    type VueElastic {
        cast_name: String
        og_name: String
        url: String
    }

    type Query {
        vueelastics: [VueElastic]
    }

    extend type Query {
        vueelastic (queryString: String): [VueElastic]
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
        vueelastic: (_, args, queryString) => new Promise((resolve, reject) => {
            // console.log('queryString', queryString.req.body.variables.queryString)
            // variable queryString requested by client (index.vue)
            let _query = queryString.req.body.variables.queryString

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
            })    
        }
    }

    export const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });