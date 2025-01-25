import express from 'express';
import openAIController from '../controllers/openai-controller';
import userAuthorization from '../middlewares/user-authorization';

export default class OpenAIRouter {
  private router = express.Router();

  public getOpenAIRouter() {
    this.router.post('/aigenerate', userAuthorization, (req, res, next) =>
      new openAIController(req, res, next).createAI()
    );

    return this.router;
  }
}
