import { OpenAI } from 'openai';
import OpenAIService from '../../src/services/openai-service';
import { mockDetail } from '../../src/mocks/openai-detail.mock';
import { mockResume } from '../../src/mocks/openai-resume.mock';
import { mockTest } from '../../src/mocks/openai-test.mock';

// Mock OpenAI
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

describe('OpenAIService', () => {
  let service: OpenAIService;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    process.env.OPENAI_API_KEY = 'mock-api-key';
    process.env.ENVIRONMENT = 'development';

    service = new OpenAIService();

    mockCreate = (OpenAI as unknown as jest.Mock).mock.results[0].value.chat
      .completions.create;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the mockDetail in the development environment with the "detail" field', async () => {
    const result = await service.createAI('Test Topic', 'detail');

    expect(result).toBe(mockDetail);
  });

  it('should return the mockResume in the development environment with the "resume" field"', async () => {
    const result = await service.createAI('Test Topic', 'resume');

    expect(result).toBe(mockResume);
  });

  it('must return mockTest in the development environment with a field other than "detail" or "resume"', async () => {
    const result = await service.createAI('Test Topic', 'test');

    expect(result).toBe(mockTest);
  });
});
