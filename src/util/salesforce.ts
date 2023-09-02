const token_data = {
    grant_type: 'client_credentials',
    client_id: `${process.env.CLIENT_ID}`,
    client_secret: `${process.env.CLIENT_SECRET}`
};

export async function salesforceApi() {
	const res = await fetch('https://animalprotectionassociationekostra--ekostraz13.sandbox.my.salesforce.com/services/apexrest/Contact/0037Y00001sS1X0QAK', {
		method: 'GET',
		headers: {
			accept: 'application/json',
			authorization: `Bearer ${process.env.CLIENT_SECRET}`,
			'content-type': 'application/json',
		},
		body: new URLSearchParams(token_data),
	}).catch((err) => console.error(err));

	if (!res || !res.ok) {
		return 'Error response from Salesforce API'
	}

	const data = await res?.json();
	

	return data;
}