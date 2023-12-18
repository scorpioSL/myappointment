import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { BaseController } from '../shared/controllers/base.controller';
import { Appointment } from '../persistence/documents/appointment.document';
import { AppointmentService } from './appointment.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentPatchDto, AppointmentPostDto } from '../shared/dto/appointment.dto';
import { Response } from 'express';
import { QueryDto } from 'src/shared/dto/query.dto';

@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController extends BaseController<Appointment, AppointmentPostDto, AppointmentPatchDto, AppointmentService> {

    constructor(protected readonly appointmentService: AppointmentService) {
        super(appointmentService);
    }

    // documentation purpose. In order to show the payload within the swagger
    @Post('')
    @ApiBody({ type: AppointmentPostDto })
    @ApiResponse({ status: 200, description: 'OK.', type: Appointment })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async post(model: AppointmentPostDto, @Res() res: Response): Promise<Response<Appointment, Record<string, any>>> {
        return await super.post(model, res);
    }

    // documentation purpose. In order to show the payload within the swagger
    @Patch('')
    @ApiBody({ type: AppointmentPatchDto })
    @ApiResponse({ status: 200, description: 'OK.', type: Appointment })
    @ApiResponse({ status: 404, description: 'Not found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async patch(model: AppointmentPatchDto, @Res() res: Response): Promise<Response<Appointment, Record<string, any>>> {
        return await super.patch(model, res);
    }

    // documentation purpose. In order to show the payload within the swagger
    @Get(':id')
    @ApiResponse({ status: 200, description: 'OK.', type: Appointment })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async find(@Param('id') id: string, @Res() res: Response): Promise<Response<Appointment, Record<string, any>>> {
        return await super.find(id, res);
    }

    // documentation purpose. In order to show the payload within the swagger
    @Post('query')
    @ApiBody({ type: QueryDto })
    @ApiResponse({ status: 200, description: 'OK.', type: Appointment, isArray: true })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async query(@Body() model: QueryDto): Promise<Appointment[]> {
        return await super.query(model);
    }
}
