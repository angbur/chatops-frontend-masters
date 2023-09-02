async function handleSlashCommand(payload: SlackSlashCommandPayload) {
	switch (payload.command) {
	  case '/hedgehug':
		// Existing commands
		return {
		  statusCode: 200,
		  body: 'Witaj w Hedgehug! Aby rozpocząć wybierz opcję z menu poniżej.\n\n' +
			'*Available Commands:*\n' +
			'• `/hedgehug` - Display this help message :information_source:\n' +
			'• `/materialyszkoleniowe` - Link to training materials :book:\n' +
			'• Add more commands here... :rocket:',
		};
	  case '/materialyszkoleniowe':
		// Existing command
		return {
		  statusCode: 200,
		  body: 'Materiały szkoleniowe znajdziesz tutaj: https://drive.google.com/file/d/1DVcaqBiqbGn25pcpyAOcBzji2T07ALfv/view?usp=drive_link'
		};
	  case '/wolnedyzury':
		// Generate a list of available shifts and buttons
		const shifts = [
		  { date: '2023-09-01', shift: 'Morning Shift' },
		  { date: '2023-09-02', shift: 'Evening Shift' },
		  // Add more shifts here...
		];
  
		const attachmentButtons = shifts.map(shift => ({
		  text: `Assign to ${shift.date}`,
		  type: 'button',
		  action_id: `assign_shift_${shift.date}`, // Unique action ID for each button
		}));
  
		const attachment = {
		  text: 'Available Shifts for September 2023:',
		  fallback: 'No available shifts.',
		  callback_id: 'assign_shifts',
		  color: '#36a64f', // Green color
		  attachment_type: 'default',
		  actions: attachmentButtons,
		};
  
		return {
		  statusCode: 200,
		  body: JSON.stringify({
			text: 'Here are the available shifts for September 2023:',
			attachments: [attachment],
		  }),
		};
	  default:
		return {
		  statusCode: 200,
		  body: `Command ${payload.command} is not recognized`,
		};
	}
  }
  