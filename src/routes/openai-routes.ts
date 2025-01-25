import express from 'express';
import OpenAIController from '../controllers/openai-controller';
import userAuthorization from '../middlewares/user-authorization';

export default class OpenAIRouter {
  private router = express.Router();

  public getOpenAIRouter() {
    this.router.post('/openai/generate', userAuthorization, (req, res, next) =>
      new OpenAIController(req, res, next).generateContent()
    );

    return this.router;
  }
}
