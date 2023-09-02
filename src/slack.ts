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
				'• `/wolnedyzury` - List available shifts :calendar:\n' +
				'• Add more commands here... :rocket:',
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
				text: 'Here are the available shifts for September 2023:',
				
				}),
			};
		case '/faq':
			return {
				statusCode: 200,
				body: JSON.stringify(generateFAQMessage()),
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


const FAQData = [
	{
	  question: 'Jak Wygląda Interwencja?',
	  answer: 'Interwencje polegają na reagowaniu na sytuacje zagrożenia dla zwierząt, takie jak przypadki znęcania się czy wypadki drogowe. Wolontariusze dostają specjalne szkolenie, które pomaga im działać w takich sytuacjach. Interwencje mogą być emocjonalnie trudne, ale nasza wspólna praca przynosi zwierzętom pomoc i nadzieję.',
	},
	{
	  question: 'Jak Się Przygotować do Interwencji?',
	  answer: 'Przygotowanie obejmuje zapoznanie się z podstawowymi zasadami interwencji, dostępem do odpowiedniego sprzętu, oraz zdobywaniem doświadczenia podczas dyżurów przy zwierzętach. Nasz zespół zawsze wspiera nowych wolontariuszy i pomaga w przygotowaniu do interwencji.'
	},
	{
	  question: 'Co Może Nas Zastać na Miejscu Interwencji?',
	  answer: 'Sytuacje interwencyjne mogą być różnorodne i nieprzewidywalne. Możemy napotkać na zwierzęta w stanie krytycznym, konieczność działań ratunkowych, a także sytuacje wymagające interakcji z innymi ludźmi. Nasze doświadczenie i szkolenie pomaga nam efektywnie radzić sobie w różnych sytuacjach.'
	},
	{
	  question: 'Czy Wolontariat Jest Trudny?',
	  answer: 'Wolontariat w organizacji Ekostraż może być emocjonalnie trudny ze względu na trudne sytuacje, z jakimi stykamy się podczas interwencji. Jednak nasza wspólna praca przynosi ogromną satysfakcję i pomaga zwierzętom, co jest naszą najważniejszą motywacją.'
	}
  ];

  function generateFAQMessage() {
	const blocks = FAQData.map((item, index) => ({
	  type: 'section',
	  block_id: `faq_${index}`,
	  text: {
		type: 'mrkdwn',
		text: `*${item.question}*`,
	  },
	  accessory: {
		type: 'button',
		text: {
		  type: 'plain_text',
		  text: 'Pokaż odpowiedź',
		},
		action_id: `show_answer_${index}`,
	  },
	}));
  
	return blocks;
  }