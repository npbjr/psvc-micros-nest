import { Test, TestingModule } from '@nestjs/testing';
import { AuthUsersController } from './auth-users.controller';

describe('AuthUsersController', () => {
  let controller: AuthUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthUsersController],
    }).compile();

    controller = module.get<AuthUsersController>(AuthUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
