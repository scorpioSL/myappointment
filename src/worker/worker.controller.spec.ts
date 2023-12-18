import { Test, TestingModule } from '@nestjs/testing';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, Model, connect } from 'mongoose';
import { Worker, WorkerSchema } from '../persistence/documents/worker.document';
import { InjectModel, getModelToken } from '@nestjs/mongoose';
import { WorkerDtoStub } from '../../test/stubs/worker.dto.stub';
import { mockResponse } from '../shared/utils/test.util';
import { Response } from 'express';
import { QueryDto } from '../shared/dto/query.dto';

describe('WorkerController', () => {
  let controller: WorkerController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let workerModel: Model<Worker>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
  });

  beforeEach(async () => {
    workerModel = mongoConnection.model(Worker.name, WorkerSchema);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerController],
      providers: [
        { provide: getModelToken(Worker.name), useValue: workerModel },
        { provide: InjectModel(Worker.name), useValue: workerModel },
        WorkerService,
      ]
    }).compile();

    controller = module.get<WorkerController>(WorkerController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('postWorker', () => {
    it('should return the saved object', async () => {
      const createdWorkerResponse: Response<Worker> = await controller.post(WorkerDtoStub(), mockResponse());
      expect(createdWorkerResponse.get('name')).toBe(WorkerDtoStub().name);
    });
  });

  describe('queryWorker', () => {
    it('should return query results', async () => {
      // add data
      await controller.post(WorkerDtoStub(), mockResponse());

      const queryModel = new QueryDto();
      const queryWorkerResponse = await controller.query(queryModel);
      expect(queryWorkerResponse.length).toBeGreaterThan(0);
      expect(queryWorkerResponse[0].name).toBe(WorkerDtoStub().name);
    });
  });
});
