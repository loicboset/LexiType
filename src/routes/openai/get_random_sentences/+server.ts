import { json } from '@sveltejs/kit';
import OpenAI from 'openai';

export const GET = async () => {
	const allSentences: string[] = [];

	try {
		const prompt = `
      You are a Spanish teacher.
      You will provide the student with 3 random sentences in Spanish, for A2 learner. For each Spanish sentence, you will also provide its English translation.
      You provide sentences that can help student learn correctly.
      You provide different and random sentences each time you are called. Don't be boring and feel free to explore new subjects. Mixing different tenses, structures and persons.
    `;

		const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY, dangerouslyAllowBrowser: true });

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'developer', content: prompt },
				{
					role: 'assistant',
					content: [{ type: 'text', text: allSentences.join(',') }]
				},
				{
					role: 'user',
					content: [{ type: 'text', text: 'Give 3 new random sentences.' }]
				}
			],
			response_format: {
				type: 'json_schema',
				json_schema: {
					name: 'predictive_text_schema',
					schema: {
						type: 'object',
						properties: {
							suggestions: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										spanish: {
											type: 'string',
											description: 'The sentence in Spanish'
										},
										english: {
											type: 'string',
											description: 'The English translation of the Spanish sentence'
										}
									},
									required: ['spanish', 'english'],
									additionalProperties: false
								}
							}
						},
						required: ['suggestions'],
						additionalProperties: false
					}
				}
			},
			store: true
		});

		const result = JSON.parse(completion.choices[0].message.content as string);

		return json(result.suggestions, { status: 200 });
	} catch (error) {
		console.error(error);
		return json(`error: ${error}`, { status: 500 });
	}
};
