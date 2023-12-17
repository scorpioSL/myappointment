import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { Appointment, AppointmentSchema } from '../persistence/documents/appointment.document';
import { InjectModel, getModelToken } from '@nestjs/mongoose';

describe('AppointmentController', () => {
  let controller: AppointmentController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let appointmentModel: Model<Appointment>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
  });

  beforeEach(async () => {
    appointmentModel = mongoConnection.model(Appointment.name, AppointmentSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        { provide: getModelToken(Appointment.name), useValue: appointmentModel },
        { provide: InjectModel(Appointment.name), useValue: appointmentModel },
        AppointmentService
      ]
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
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
});
