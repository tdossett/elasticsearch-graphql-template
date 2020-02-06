import { client } from './server.client'

export const createIndex = (newIndex) => {
    client.indices.create({
        // example: index: 'blacksopedia'
        index: newIndex
    }, function(error, response, status) {
        if (error) {
            console.log(error)
        } else {
            // console.log('created a new index', response)
            console.info('🚀 Created a New Index');
            console.info(response);
        }
    });
}
