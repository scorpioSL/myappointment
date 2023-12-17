import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Worker } from "./worker.document";
import { schemaOptions } from "../../shared/utils/mongoose.util";

export type AppointmentStatusType = 'CREATED' | 'IN-PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'RE-SCHEDULED';

export type AppointmentDocument = HydratedDocument<Appointment>;


@Schema(schemaOptions())
export class Appointment {
    @Prop()
    public name: string;

    @Prop()
    public contactNumber: string;

    @Prop()
    public appointmentDateTime: Date;

    @Prop([String])
    public services: string[];

    @Prop(String)
    public status: AppointmentStatusType;

    @Prop()
    public apointmentCharge: number;

    @Prop()
    public serviceCharge: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
    public worker: Worker;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);

