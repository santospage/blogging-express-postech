import { OpenAI } from 'openai';

export default class OpenAIService {
  private api: OpenAI;

  constructor() {
    this.api = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  }

  public async createAI(
    topic: string,
    field: string
  ): Promise<string | undefined> {
    try {
      const userContent =
        field === 'detail'
          ? `Detalhe o seguinte tópico em 30 linhas: ${topic}`
          : `Resuma o seguinte tópico em 10 linhas: ${topic}`;

      /*    
        const response = await this.api.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 100,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userContent },
        ],
      });
      */

      const response = {
        id: 'chatcmpl-abc123',
        object: 'chat.completion',
        created: 1677652283,
        model: 'gpt-3.5-turbo-0613',
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: 'This is the generated text.',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          prompt_tokens: 56,
          completion_tokens: 31,
          total_tokens: 87,
        },
      };

      return response.choices[0]?.message?.content?.trim();
    } catch (error) {
      return undefined;
    }
  }
}
