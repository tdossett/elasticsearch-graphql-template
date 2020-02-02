import { client } from './server.client'

export const createBody = (index, newBody) => {
    // example: index: 'Blacksopedia'
    // body: {
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
    // console.log('newBody', newBody);

    client.index({
        index: index,
        body: newBody
    }, function(error, response, status) {
        if (error) {
            console.log('error', error);
        } else {
            console.log('created a new index', response);
        }
    });

}
