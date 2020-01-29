import { Client} from '@elastic/elasticsearch'

/**
 * ElasticSearch *** client
 */

// const _username = process.env.elastic_user
// const _password = process.env.elastic_password

/* export const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: _username,
        password: _password
    },
    log: 'error'
}); */

export const client = new Client({
    node: 'http://localhost:9200',
    log: 'error'
});