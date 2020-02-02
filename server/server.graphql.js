import { ElasticSearchClient, CreateIndex, CreateBody } from './server.elasticsearch';
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

    type NewIndex {
        newIndex: String
    }

    type NewBody {
        newBody: String
    }

    type Blacksopedia {
        business_name: String
        owner: String
        address: String
        city: String
        state: String
        email: String
        website: String
        logo: String
    }

    # this object is used in 'createBody' mutation:
    input newBody {
        business_name: String
        owner: String
        address: String
        city: String
        state: String
        email: String
        website: String
        logo: String
    }

    # the schema allows the following query:
    type Query {
        vueelastics: [VueElastic]
    }

    extend type Query {
        vueelastic (queryString: String): [VueElastic]
    }

    # this schema allows the following mutation:
    # NOTE: here i am using Blacksopdeia as retuned object for createBody nutation
    type Mutation {
        createIndex (newIndex: String): NewIndex
        createBody (index: String, newBody: newBody): NewBody
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
        vueelastic: (_, args) => new Promise((resolve, reject) => {
            // console.log('args', args)
            // argument queryString requested by client (index.vue)
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
            })    
    },
    Mutation: {
        createIndex: (_, args) => new Promise((resolve, reject) => {
            let _newIndex = args.newIndex; // not really ideal but
            // console.log(_newIndex);
            
            CreateIndex(_newIndex);
            resolve(_newIndex);

            return _newIndex
        }),
        createBody: (_, args) => new Promise((resolve, reject) => {
            let _index = args.index;
            let _newBody = args.newBody;
            // console.log('_index',_index);
            // console.log('_newBody', _newBody);

            CreateBody(_index, _newBody);

            resolve(_newBody);

            // change this to return object _newbody not string below
            return '_newBody'
        })
    }
}

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});