import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Worker } from '../persistence/documents/worker.document';
import { Model } from 'mongoose';
import { BaseService } from '../shared/services/base.service';
import { WorkderPatchDto, WorkerPostDto } from '../shared/dto/worker.dto';

@Injectable()
export class WorkerService extends BaseService<Worker, WorkerPostDto, WorkderPatchDto> {
    constructor(@InjectModel(Worker.name) protected workerModel: Model<Worker>) {
        super(workerModel);
    }
}
