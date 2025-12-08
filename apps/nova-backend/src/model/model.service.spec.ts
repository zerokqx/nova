import { Test, TestingModule } from '@nestjs/testing';
import { ModelService } from './model.service';

describe('ModelService', () => {
  let service: ModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelService],
    }).compile();

    service = module.get<ModelService>(ModelService);
    const id = await service.createModel('Flash2');

    it('check-create', () => {
      expect(service.getById());
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
