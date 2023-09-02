const token_url = process.env.TOKEN_URL;
const client_id =
  '3MVG9OjW2TAjFKUv3KNCFDmh5FBbbCyLC4dOIooMhGt_WeOiX8shx6n9Izy6fzt0Pp.gJP3ocK00C42ysz55I';
const client_secret =
  'CECC3B760D158E24D32C8A2D8590A71830FC4B1DB0884DBF27A93F6213F048F4';
const token_data = {
  grant_type: 'client_credentials',
  client_id: client_id,
  client_secret: client_secret,
};

export const fetchApiGET = async() =>fetch(`${token_url}`, {
  method: 'POST',
  body: new URLSearchParams(token_data),
})
  .then((token_response) => {
    if (token_response.status === 200) {
      return token_response.json();
    } else {
      console.log(
        `Token request failed with status code ${token_response.status}`
      );
      throw new Error(
        `Token request failed with status code ${token_response.status}`
      );
    }
  })
  .then((data) => {
    const access_token = data.access_token;
    const endpoint_url =
      'https://animalprotectionassociationekostra--ekostraz13.sandbox.my.salesforce.com/services/apexrest/Contact/0037Y00001sS1X0QAK';
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    fetch(endpoint_url, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log(`Request failed with status code ${response.status}`);
          throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .then((responseData) => {
        // Process the response content here
        console.log('Request Successful');
        console.log(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
  });
