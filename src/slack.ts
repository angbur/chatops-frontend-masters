import type { Handler } from '@netlify/functions';

import { parse } from 'querystring';
import { verifySlackRequest } from './util/slack';

async function handleSlashCommand(payload: SlackSlashCommandPayload) {
	switch (payload.command) {
		case '/hedgehug':
			return {
				statusCode: 200,
				body: 'Witaj w Hedgehug! Aby rozpocząć wybierz opcję z menu poniżej.\n\n' +
					'*Available Commands:*\n' +
					'• `/hedgehug` - Display this help message :information_source:\n' +
					'• `/materialyszkoleniowe` - Link to training materials :book:\n' +
					'• Add more commands here... :rocket:',
			};
		case '/materialyszkoleniowe':
			return {
				statusCode: 200,
				body: 'Materiały szkoleniowe znajdziesz tutaj: https://drive.google.com/file/d/1DVcaqBiqbGn25pcpyAOcBzji2T07ALfv/view?usp=drive_link'
			};

		default:
			return {
				statusCode: 200,
				body: `Command ${payload.command} is not recognized`,
			};
	}
}

export const handler: Handler = async (event) => {
	const valid = verifySlackRequest(event);

	/* if (!valid) {
		console.error('invalid request');

		return {
			statusCode: 400,
			body: 'invalid request',
		};
	}
 */

	const body = parse(event.body ?? '') as SlackPayload;

	if (body.command) {
		return handleSlashCommand(body as SlackSlashCommandPayload);
	}

	// TODO handle interactivity (e.g. context commands, modals)
	if (body.payload) {
		const payload = JSON.parse(body.payload);
		return payload;
	}

	return {
		statusCode: 200,
		body: 'TODO: handle Slack commands and interactivity',
	};
};
