import { Test, TestingModule } from '@nestjs/testing';
import { WorkerService } from './worker.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { WorkerSchema, Worker } from '../persistence/documents/worker.document';
import { InjectModel, getModelToken } from '@nestjs/mongoose';

describe('WorkerService', () => {
  let service: WorkerService;
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
      providers: [
        { provide: getModelToken(Worker.name), useValue: workerModel },
        { provide: InjectModel(Worker.name), useValue: workerModel },
        WorkerService
      ],
    }).compile();

    service = module.get<WorkerService>(WorkerService);
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
    expect(service).toBeDefined();
  });
});
