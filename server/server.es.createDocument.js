import { client } from './server.client'

export const createDocument = (index, newDocument) => {
    // example: index: 'blacksopedia'
    // newDocument: {
    //     business_name: 'Dostek, Inc.',
    //     owner: 'Timothy Dossett',
    //     address: '1952 Feltcher Ave',
    //     city: 'South Pasadena',
    //     state: 'California',
    //     email: 'tdossett@dostekinc.net',
    //     website: 'https://www.dostekinc.net',
    //     logo: 'https://dostekinc-image.s3-us-west-1.amazonaws.com/dostekinc_logo.png'
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
            console.log('created a new document', response);
        }
    });

}
