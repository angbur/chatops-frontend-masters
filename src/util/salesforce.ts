const token_data = {
    grant_type: 'client_credentials',
    client_id: `${process.env.CLIENT_ID}`,
    client_secret: `${process.env.CLIENT_SECRET}`
};

export const salesforceApi = () => {

	const res = fetch (`${process.env.TOKEN_URL}`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/x-www-form-urlencoded',
			},
		body: new URLSearchParams(token_data),
		}).then(data => {
			const token = data.json();
			return token;
		
			/* fetch('https://animalprotectionassociationekostra--ekostraz13.sandbox.my.salesforce.com/services/apexrest/Contact/0037Y00001sS1X0QAK', {
				method: 'GET',
				headers: {
					accept: 'application/json',
					authorization: `Bearer ${token}`,
					'content-type': 'application/json',
				},
			}) */
			}
	);
	return res; 
}