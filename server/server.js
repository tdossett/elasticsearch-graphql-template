import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { ApolloServer } from 'apollo-server-express'
import { ApiElasticSearchClient } from './server.elasticsearch'
import { schema } from './server.graphql'

const app = express()

// PORT
const PORT = 9100

const server = new ApolloServer({
    schema: schema,
    playground: true,
    context: ({ req, res }) => ({ req, res })
});

// Use the BofyParser as a middleware
// app.use(bodyParser.json());

// Set port for the app to listen on
app.set('port', process.env.PORT || 3001);

// Set path to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method');
    next();
  });
  
  // Define the `/search` route that should return elastic search results
  app.get('/search', ApiElasticSearchClient);
  
  server.applyMiddleware({app});
  
  app.listen(PORT, function () {
    console.log(`Express server listening on port :${PORT}${server.graphqlPath}`);
  });
