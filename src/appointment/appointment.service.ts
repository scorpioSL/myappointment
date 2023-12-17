import { Injectable } from '@nestjs/common';
import { Appointment } from '../persistence/documents/appointment.document';
import { BaseService } from '../shared/services/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentService extends BaseService<Appointment> {
    constructor(@InjectModel(Appointment.name) protected appointmentModel: Model<Appointment>) {
        super(appointmentModel);
    }
}
