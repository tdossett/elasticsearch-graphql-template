import { client } from './server.client'

export const updateDocument = (index, documentId, updatedDocument) => {
    // example: 
    // index: 'blacksopedia'
    // documentId: '93AAEXABQk-s3Mblp7iG'
    // updateDocument: {
    //     business_name: 'Dostek, Inc.',
    //     owner: '$$$$ Timothy Dossett $$$$',
    //     address: '1952 Feltcher Ave',
    //     city: 'South Pasadena',
    //     state: 'California',
    //     email: 'tdossett@dostekinc.net',
    //     website: 'https://www.dostekinc.net',
    //     logo: 'https://dostekinc-image.s3-us-west-1.amazonaws.com/dostekinc_logo.png'
    //   }

    console.log('index', index);
    console.log('documentId', documentId);
    console.log('updatedDocument', updatedDocument);

    client.update({
        index: index,
        id: documentId,
        body: {
            doc: { 
                business_name: updatedDocument.business_name,
                owner: updatedDocument.owner,
                address: updatedDocument.address,
                city: updatedDocument.city,
                state: updatedDocument.state,
                email: updatedDocument.email,
                website: updatedDocument.website,
                logo: updatedDocument.logo
             }
        },
        refresh: true
    }, function(error, response, status) {
        if (error) {
            console.log('error', error);
        } else {
            console.log('updated document', response);
        }
    });
}
