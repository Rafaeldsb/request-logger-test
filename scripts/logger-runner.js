const axios = require('axios');

async function doRequest() {
  await axios
    .post('https://request-logger-q7rmt3hima-uc.a.run.app/v1/requests')
    .then(() => {
      console.log('logged!');
    })
    .catch((error) => {
      console.error(error.message);
    });
}

setInterval(doRequest, 60000);

doRequest();
