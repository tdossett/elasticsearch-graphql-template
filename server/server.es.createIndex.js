import { client } from './server.client'

export const createIndex = (newIndex) => {
    client.indices.create({
        // example: index: 'vue-elastic'
        index: newIndex
    }, function(error, response, status) {
        if (error) {
            console.log(error)
        } else {
            console.log('created a new index', response)
        }
    });
}
