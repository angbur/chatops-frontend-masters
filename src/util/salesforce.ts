const token_data = {
    grant_type: 'client_credentials',
    client_id: `${process.env.CLIENT_ID}`,
    client_secret: `${process.env.CLIENT_SECRET}`
};

export async function salesforceApi() {
	const res = await fetch(`${process.env.TOKEN_URL}`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			authorization: `Bearer ${process.env.CLIENT_SECRET}`,
			'content-type': 'application/json',
		},
		body: new URLSearchParams(token_data),
	}).catch((err) => console.error(err));

	if (!res || !res.ok) {
		console.error(res);
	}

	const data = await res?.json();

	return data;
}

export async function getNewItems(): Promise<NewItem[]> {
	const notionData = await salesforceApi();

	const openItems = notionData.results.map((item: NotionItem) => {
		return {
			opinion: item.properties.opinion.title[0].text.content,
			spiceLevel: item.properties.spiceLevel.select.name,
			status: item.properties.Status.status.name,
		};
	});

	return openItems;
}

export async function saveItem(item: NewItem) {
	const res = await salesforceApi();

	if (!res.ok) {
		console.log(res);
	}
}
