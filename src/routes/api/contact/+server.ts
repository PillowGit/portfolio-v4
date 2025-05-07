import { json, type RequestHandler } from '@sveltejs/kit';

interface RequestBody {
	message: string;
	name: string;
	contact: string;
	[key: string]: string;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data: RequestBody = await request.json();

		if (
			!data ||
			typeof data.message !== 'string' ||
			typeof data.name !== 'string' ||
			typeof data.contact !== 'string'
		) {
			return json({ error: 'Invalid input' }, { status: 400 });
		}

		// Print data to discord webhook
		const webhook_response = await fetch(
			'https://discord.com/api/webhooks/1369730591913803989/yA77LQcj9VOn5kKM8nb2oGyG0iNJabbqH3KZWFZ_gVNS6g0hR4U-cuMOewLdPyz92X83',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					content: '',
					tts: false,
					embeds: [
						{
							title: data.name,
							description: data.message,
							color: 2326507,
							fields: [],
							footer: {
								text: data.contact
							},
							timestamp: new Date().toISOString()
						}
					],
					components: [],
					actions: {},
					flags: 0
				})
			}
		);

		if (!webhook_response.ok) {
			return json({ error: 'Failed to send message' }, { status: 500 });
		}

		return json({ message: 'Message sent successfully' }, { status: 200 });
	} catch (error: any) {
		console.error('Error in POST /api/contact:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
