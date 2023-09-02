const token_data = {
    grant_type: 'client_credentials',
    client_id: `${process.env.CLIENT_ID}`,
    client_secret: `${process.env.CLIENT_SECRET}`
};

export const salesforceApi = () => {

	const res = fetch (`${process.env.TOKEN_URL}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			},
		body: new URLSearchParams(token_data),
		}).then((res) => res.json());
	return res; 
}