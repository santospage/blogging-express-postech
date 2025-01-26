import { OpenAI } from 'openai';
import { mockDetail } from '../mocks/openai-detail.mock';
import { mockResume } from '../mocks/openai-resume.mock';
import { mockTest } from '../mocks/openai-test.mock';

export default class OpenAIService {
  private api: OpenAI;
  private environment: string;

  constructor() {
    this.api = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
    this.environment = process.env.ENVIRONMENT!;
  }

  public async createAI(
    topic: string,
    field: string
  ): Promise<string | undefined> {
    try {
      if (this.environment.toLowerCase().trim() === 'development') {
        return new Promise((response) => {
          setTimeout(() => {
            if (field === 'detail') {
              response(mockDetail);
            } else if (field === 'resume') {
              response(mockResume);
            } else {
              response(mockTest);
            }
          }, 3000);
        });
      } else {
        const userContent =
          field === 'detail'
            ? `Detalhe o seguinte tópico em 30 linhas: ${topic}`
            : field === 'resume'
            ? `Resuma o seguinte tópico em 10 linhas: ${topic}`
            : `Avaliação com 10 questões alternativas e gabarito sobre o seguinte tópico: ${topic}`;

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
      }
    } catch (error) {
      return undefined;
    }
  }
}
