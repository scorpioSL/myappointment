import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkerSchema } from '../persistence/documents/worker.document';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Worker', schema: WorkerSchema }]),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [
    WorkerService,
  ],
})
export class WorkerModule { }
