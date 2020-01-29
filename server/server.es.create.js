import { client } from './server.client'

client.indices.create({
    index: 'vue-elastic'
}, function(error, response, status) {
    if (error) {
        console.log(error)
    } else {
        console.log('created a new index', response)
    }
});