import { Controller, Post, Res } from '@nestjs/common';
import { BaseController } from '../shared/controllers/base.controller';
import { Appointment } from '../persistence/documents/appointment.document';
import { AppointmentService } from './appointment.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseDto } from '../shared/dto/base.dto';
import { AppointmentDto } from '../shared/dto/appointment.dto';
import { Response } from 'express';

@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController extends BaseController<Appointment, AppointmentService> {

    constructor(protected readonly appointmentService: AppointmentService) {
        super(appointmentService);
    }

    // documentation purpose. In order to show the payload within the swagger
    @Post('')
    @ApiBody({ type: AppointmentDto })
    @ApiResponse({ status: 200, description: 'OK.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async upsert<AppointmentDto extends BaseDto>(model: AppointmentDto, @Res() res: Response): Promise<Response<Appointment, Record<string, any>>> {
        return await super.upsert(model, res);
    }
}
