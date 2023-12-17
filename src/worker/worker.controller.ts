import { Controller, Post, Res } from '@nestjs/common';
import { Worker } from '../persistence/documents/worker.document';
import { BaseController } from '../shared/controllers/base.controller';
import { WorkerService } from './worker.service';
import { BaseDto } from '../shared/dto/base.dto';
import { WorkerDto } from '../shared/dto/worker.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Worker')
@Controller('worker')
export class WorkerController extends BaseController<Worker, WorkerService> {

    constructor(protected readonly workerService: WorkerService) {
        super(workerService);
    }

    // documentation purpose. In order to show the payload within the swagger
    @Post('')
    @ApiBody({ type: WorkerDto })
    @ApiResponse({ status: 200, description: 'OK.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async upsert<WorkerDto extends BaseDto>(model: WorkerDto, @Res() res: Response): Promise<Response<Worker, Record<string, any>>> {
        return await super.upsert(model, res);
    }
}
