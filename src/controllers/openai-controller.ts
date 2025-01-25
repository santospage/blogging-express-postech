import { NextFunction, Response, Request } from 'express';
import OpenAIService from '../services/openai-service';
import BadRequest from '../errors/error-request';

export default class OpenAIController {
  private openAIService: OpenAIService;

  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction
  ) {
    this.openAIService = new OpenAIService();
  }

  public async generateContent(): Promise<void> {
    try {
      const { topic, field } = this.req.body;

      if (!topic || !field) {
        throw new BadRequest('Both "topic" and "field" are required.');
      }

      const content = await this.openAIService.generateAI(topic, field);

      if (content) {
        this.res.status(200).json({ message: 'Content generated!', content });
      } else {
        throw new Error('Content generation failed.');
      }
    } catch (e) {
      this.next(e);
    }
  }
}
