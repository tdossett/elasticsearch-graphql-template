import { client } from './server.client'

export const deleteDocument = (index, documentId) => {
  client.delete(
    {
      index: index,
      id: documentId
    },
  (error, response, status) => {
      if(!error) {
        console.info('🚀 Deleted Document');
        console.info(response);

      } else {
        console.info(error);
      }
    });
}