import {Test, TestingModule} from '@nestjs/testing';
import {TaskController} from 'src/modules/task/task.controller';

describe('TodoController', () => {
    let controller: TaskController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TaskController],
        }).compile();

        controller = module.get<TaskController>(TaskController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
