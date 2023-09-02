import type { Handler } from '@netlify/functions';
import { parse } from 'querystring';
import { verifySlackRequest } from './util/slack';


I see what you're looking for. You want a formatted list of dates and shifts, each followed by a button element for assignment. Here's how you can modify the handleWolneDyzuryCommand function to achieve that:

javascript
Copy code
function handleWolneDyzuryCommand() {
  const shifts = [
    { date: '01.09', shift: 'Morning Shift' },
    { date: '02.09', shift: 'Evening Shift' },
    { date: '03.09', shift: 'Morning Shift' },
    { date: '04.09', shift: 'Evening Shift' }
  ];

  const message = shifts.map(shift => {
    return `- ${shift.date} - ${shift.shift} <button for assignment>`;
  }).join('\n');

  return {
    text: `Here are the available shifts for September 2023:\n${message}`,
  };
};

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
          attachments: [handleWolneDyzuryCommand()],
        }),
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

  // Check for valid request
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

  // TODO: Handle interactivity (e.g., context commands, modals)
  if (body.payload) {
    const payload = JSON.parse(body.payload);
    return payload;
  }

  return {
    statusCode: 200,
    body: 'TODO: handle Slack commands and interactivity',
  };
};
