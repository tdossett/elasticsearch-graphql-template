import { client } from './server.client'

export const deleteIndex = (index) => {
  client.indices.delete(
    {
      index: index
    },
  (error, response, status) => {
      if(!error) {
        console.info('🚀 Deleted index');
        console.info(response);

      } else {
        console.info(error);
      }
    });
}