import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';

const mockTask: Task = {
  id: 'uuid-1234',
  title: 'Test Task',
  description: 'Test description',
  status: TaskStatus.OPEN,
  createdAt: new Date(),
};

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar e retornar uma nova tarefa', async () => {
      const createDto = { title: 'Test Task', description: 'Test description' };
      mockRepository.create.mockReturnValue(mockTask);
      mockRepository.save.mockResolvedValue(mockTask);

      const result = await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockTask);
      expect(result).toEqual(mockTask);
    });

    it('deve criar tarefa sem description', async () => {
      const createDto = { title: 'Only title' };
      const taskWithoutDesc = { ...mockTask, description: undefined };
      mockRepository.create.mockReturnValue(taskWithoutDesc);
      mockRepository.save.mockResolvedValue(taskWithoutDesc);

      const result = await service.create(createDto);

      expect(result.description).toBeUndefined();
    });
  });

  describe('findById', () => {
    it('deve retornar a tarefa quando o id existir', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockTask);

      const result = await service.findById('uuid-1234');

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 'uuid-1234' });
      expect(result).toEqual(mockTask);
    });

    it('deve lançar NotFoundException quando o id não existir', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findById('id-inexistente')).rejects.toThrow(
        new NotFoundException('Task with id "id-inexistente" not found'),
      );
    });
  });

  describe('delete', () => {
    it('deve deletar a tarefa quando o id existir', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockTask);
      mockRepository.remove.mockResolvedValue(undefined);

      await service.delete('uuid-1234');

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 'uuid-1234' });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockTask);
    });

    it('deve lançar NotFoundException ao tentar deletar id inexistente', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.delete('id-inexistente')).rejects.toThrow(NotFoundException);
    });
  });
});
