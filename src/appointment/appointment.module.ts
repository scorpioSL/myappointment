import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema } from '../persistence/documents/appointment.document';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Appointment', schema: AppointmentSchema }])],
  providers: [AppointmentService],
  controllers: [AppointmentController],
  exports: [
    AppointmentService,
  ]
})
export class AppointmentModule { }
