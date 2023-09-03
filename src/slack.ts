import type { Handler } from '@netlify/functions';
import { parse } from 'querystring';
import { blocks, modal, postMessageToSlack, slackApi, verifySlackRequest } from './util/slack';

async function handleSlashCommand(payload: SlackSlashCommandPayload) {
	switch (payload.command) {
		case '/hedgehug':
			return {
				statusCode: 200,
				body: '*Dostępne Komendy:*\n' +
				'• `/hedgehug` - Wyświetl tę wiadomość pomocy :information_source:\n' +
				'• `/materialyszkoleniowe` - Link do materiałów szkoleniowych :book:\n' +
				'• `/wolnedyzury` - Lista dostępnych dyżurów :calendar:\n' +
				'• `/faq` - Najczęściej Zadawane Pytania :question:\n' +
				'• `/wtf` - niespodzianka ... :rocket:'				
			};
		case '/materialyszkoleniowe':
			return {
				statusCode: 200,
				body: 'Materiały szkoleniowe znajdziesz tutaj: https://drive.google.com/file/d/1DVcaqBiqbGn25pcpyAOcBzji2T07ALfv/view?usp=drive_link'
			};
		case '/wolnedyzury':
			return {
				statusCode: 200,
				body: JSON.stringify({
				  blocks: [
					{
					  type: 'section',
					  text: {
						type: 'mrkdwn',
						text: 'Dostępne dyżury w przyszłym miesiącu:',
					  },
					},
					{
					  type: 'section',
					  block_id: 'shifts', // You can provide a unique block ID here
					  fields: [
						{
						  type: 'mrkdwn',
						  text: '• 09/09/23 - 08:00-16:00 - DYŻUR KOTY :star:',
						},
						{
						  type: 'mrkdwn',
						  text: '• 10/09/23 - 08:00-16:00 - DYŻUR KOTY :star:',
						},
						// Add more shift entries here...
					  ],
					},
					{
					  type: 'actions',
					  elements: [
						{
						  type: 'button',
						  action_id: 'signup_button', // You can provide a unique action ID here
						  text: {
							type: 'plain_text',
							text: 'Zapisuję się',
						  },
						  style: 'primary',
						},
					  ],
					},
				  ],
				}),
			  };
		case '/faq':
			return {
				statusCode: 200,
				body: 'Witaj w Hedgehug FAQ! Oto najczęściej zadawane pytania i odpowiedzi na nie:\n\n' +
				'📚 *Pytanie: Jak Wygląda Interwencja?*\n' +
				'Odpowiedź: Interwencje polegają na reagowaniu na sytuacje zagrożenia dla zwierząt, takie jak przypadki znęcania się czy wypadki drogowe. Wolontariusze dostają specjalne szkolenie, które pomaga im działać w takich sytuacjach. Interwencje mogą być emocjonalnie trudne, ale nasza wspólna praca przynosi zwierzętom pomoc i nadzieję. :animal_rescue:\n\n' +
				'🚀 *Pytanie: Jak Się Przygotować do Interwencji?*\n' +
				'Odpowiedź: Przygotowanie obejmuje zapoznanie się z podstawowymi zasadami interwencji, dostępem do odpowiedniego sprzętu oraz zdobywanie doświadczenia podczas dyżurów przy zwierzętach. Nasz zespół zawsze wspiera nowych wolontariuszy i pomaga w przygotowaniu do interwencji. :gear:\n\n' +
				'🌟 *Pytanie: Co Może Nas Zastać na Miejscu Interwencji?*\n' +
				'Odpowiedź: Sytuacje interwencyjne mogą być różnorodne i nieprzewidywalne. Możemy napotkać na zwierzęta w stanie krytycznym, konieczność działań ratunkowych, a także sytuacje wymagające interakcji z innymi ludźmi. Nasze doświadczenie i szkolenie pomaga nam efektywnie radzić sobie w różnych sytuacjach. :warning:\n\n' +
				'🤔 *Pytanie: Czy Wolontariat Jest Trudny?*\n' +
				'Odpowiedź: Wolontariat w organizacji Hedgehug może być emocjonalnie trudny ze względu na trudne sytuacje, z jakimi stykamy się podczas interwencji. Jednak nasza wspólna praca przynosi ogromną satysfakcję i pomaga zwierzętom, co jest naszą najważniejszą motywacją. :heart:'
			};
			case '/wtf':
				return {
				  statusCode: 200,
				  body: imageUrl
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

	if (!valid) {
		console.error('Invalid request');
		return {
			statusCode: 400,
			body: 'Invalid request',
		};
	}

	const body = parse(event.body ?? '') as SlackPayload;

	if (body.command) {
		return handleSlashCommand(body as SlackSlashCommandPayload);
	}

	if (body.payload) {
		const payload = JSON.parse(body.payload);
		return payload;
	}	

	return {
		statusCode: 200,
		body: 'TODO: handle Slack commands and interactivity',
	};
};

const imageUrl = 'https://sqadcxtreme.slack.com/files/U05QP1MT40K/F05R4C4KJKB/image.png';