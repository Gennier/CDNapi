import { Test, TestingModule } from '@nestjs/testing';
import { FreelanceController } from './freelance.controller';

describe('Freelance Controller', () => {
  let controller: FreelanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreelanceController],
    }).compile();

    controller = module.get<FreelanceController>(FreelanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
