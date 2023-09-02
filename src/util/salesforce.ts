const token_data = {
    grant_type: 'client_credentials',
    client_id: `${process.env.CLIENT_ID}`,
    client_secret: `${process.env.CLIENT_SECRET}`
};

export const salesforceApi = () => {

	try {
		const response = fetch(`${process.env.TOKEN_URL}`, {
			method: 'POST',
			body: JSON.stringify(new URLSearchParams(token_data)),
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
			}
		})
		.then(response => response.json())
		.then(data => {
			return data;
		});
		return response;
	} catch (error) {
		console.error(error);

	}
}