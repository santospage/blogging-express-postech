import { NextFunction, Response, Request } from 'express';
import OpenAIService from '../services/openai-service';

export default class OpenAIController {
  private openAIService: OpenAIService;

  constructor(
    private req: Request,
    private res: Response,
    private next: NextFunction
  ) {
    this.openAIService = new OpenAIService();
  }

  public async createAI(): Promise<void> {
    try {
      const { topic, field } = this.req.body;

      const content = await this.openAIService.createAI(topic, field);

      if (content !== undefined) {
        this.res.status(200).json({ message: content });
      } else {
        this.res.status(429).json({ message: 'Content not created!' });
      }
    } catch (e) {
      this.next(e);
    }
  }
}
