import { client } from './server.client'

client.indices.delete(
    {
      index: 'vue-elastic'
    },
    (error, response, status) => {
      if(!error) {
        console.info('🚀 Deleted index');
        console.info(response);
      } else {
        console.info(error);
      }
  
    }
  );