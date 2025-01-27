import OpenAIController from '../../src/controllers/openai-controller';
import OpenAIService from '../../src/services/openai-service';
import { Request, Response, NextFunction } from 'express';

// Mock do OpenAI
jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: jest.fn(),
          },
        },
      };
    }),
  };
});

describe('OpenAIController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;
  let mockOpenAIService: jest.Mocked<OpenAIService>;
  let controller: OpenAIController;

  beforeAll(() => {
    process.env.OPENAI_API_KEY = 'test-api-key';
    process.env.ENVIRONMENT = 'development';
  });

  afterAll(() => {
    delete process.env.OPENAI_API_KEY;
    delete process.env.ENVIRONMENT;
  });

  beforeEach(() => {
    // Mock Request
    mockReq = {
      body: {
        topic: 'Test Topic',
        field: 'Test Field',
      },
    };

    // Mock Response
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock NextFunction
    mockNext = jest.fn();

    mockOpenAIService = {
      createAI: jest.fn(),
    } as unknown as jest.Mocked<OpenAIService>;

    controller = new OpenAIController(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    controller['openAIService'] = mockOpenAIService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status 200 and created content when createAI is successful', async () => {
    mockOpenAIService.createAI.mockResolvedValue('Conteúdo gerado pelo AI');

    await controller.createAI();

    expect(mockOpenAIService.createAI).toHaveBeenCalledWith(
      'Test Topic',
      'Test Field'
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Conteúdo gerado pelo AI',
    });
  });

  it('should return status 429 when createAI does not create content', async () => {
    // Mock do retorno do serviço
    mockOpenAIService.createAI.mockResolvedValue(undefined);

    await controller.createAI();

    expect(mockOpenAIService.createAI).toHaveBeenCalledWith(
      'Test Topic',
      'Test Field'
    );
    expect(mockRes.status).toHaveBeenCalledWith(429);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Content not created!',
    });
  });

  it('should call next with the error in case of exception', async () => {
    const error = new Error('Erro no serviço');
    mockOpenAIService.createAI.mockRejectedValue(error);

    await controller.createAI();

    expect(mockOpenAIService.createAI).toHaveBeenCalledWith(
      'Test Topic',
      'Test Field'
    );
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
