import { client } from './server.client'

export const createDocument = (index, newDocument) => {
    // example: index: 'blacksopedia'
    // newDocument: {
    //     business_name: 'Dostek, Inc.',
    //     owner: 'Timothy Dossett',
    //     address: '1952 Street Ave',
    //     city: 'South Pasadena',
    //     state: 'California',
    //     zip: '91030'
    //     email: 'tdossett@dostekinc.net',
    //     website: 'https://www.dostekinc.net',
    //     logo: 'https:XXXXXXXX/dostekinc_logo.png'
    //   }

    // console.log('index', index);
    // console.log('newDocument', newDocument);

    client.index({
        index: index,
        body: newDocument
    }, function(error, response, status) {
        if (error) {
            console.log('error', error);
        } else {
            console.info('🚀 Created a New Document');
            console.info(response);
        }
    });

}
