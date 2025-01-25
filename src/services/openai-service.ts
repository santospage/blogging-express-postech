import { OpenAI } from 'openai';

export default class OpenAIService {
  private api: OpenAI;

  constructor() {
    this.api = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  }

  public async generateAI(
    topic: string,
    field: string
  ): Promise<string | undefined> {
    try {
      const userContent =
        field === 'detail'
          ? `Detalhe o seguinte tópico em 30 linhas: ${topic}`
          : `Resuma o seguinte tópico em 10 linhas: ${topic}`;

      const response = await this.api.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 100,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userContent },
        ],
      });

      return response.choices[0]?.message?.content?.trim();
    } catch (error) {
      console.error('OpenAIService Error:', error);
      return undefined;
    }
  }
}
