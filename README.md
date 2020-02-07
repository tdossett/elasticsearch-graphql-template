# Elasticsearch Graphql Template

> This project demonstrates the use of Nuxt.js, Vue.js, Vuetify, Vue-Apollo, GraphQL and Elasticsearch. Nuxt.js uses @nuxtjs/apollo with additional configurations in nuxt.config.js file to establish a connection to the Apollo client for GraphQL using httpEndpoint: 'http://localhost:9100/graphql' that can be access when app is running. The Elasticsearch client is configured as Nuxt.js serverMiddleware to establish connection to httpEndpoint: 'http://localhost:9200'. Front-End (Vuetify) is accessed via httpEndpoint: 'http://localhost:3000'.

Note: package: 'apollo-server-express' is the Express and Connect integration of GraphQL Server. In addtion all GraphQL 'queries' are demonstrated using Elasticsearch index: 'vue-elastic' while 'mutations' are demonstrated using index: 'blacksopedia'.

Demonstrated Features:
1. GraphQL: Queries and Mutations
2. Elasticsearch: Bulk Insert, Create Index, Create Document, Update Document, Delete Index, Delete Document.

Requirements: 
1. locally installed Elasticsearch server: https://www.elastic.co/downloads/elasticsearch.
2. Windows (optional): Setup Elasticsearch as a windows service: https://www.elastic.co/guide/en/elasticsearch/reference/current/windows.html.

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

Nuxt.js: For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
