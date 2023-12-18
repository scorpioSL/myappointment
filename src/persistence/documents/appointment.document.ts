import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, HydratedDocument } from "mongoose";
import { Worker } from "./worker.document";
import { schemaOptions } from "../../shared/utils/mongoose.util";
import { ApiProperty } from "@nestjs/swagger";

export type AppointmentStatusType = 'CREATED' | 'IN-PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'RE-SCHEDULED';

export type AppointmentDocument = HydratedDocument<Appointment>;


@Schema(schemaOptions())
export class Appointment extends Document {
    @ApiProperty()
    @Prop()
    public name: string;

    @ApiProperty()
    @Prop()
    public contactNumber: string;

    @ApiProperty()
    @Prop()
    public appointmentDateTime: Date;

    @ApiProperty()
    @Prop([String])
    public services: string[];

    @ApiProperty()
    @Prop(String)
    public status: AppointmentStatusType;

    @ApiProperty()
    @Prop()
    public apointmentCharge: number;

    @ApiProperty()
    @Prop()
    public serviceCharge: number;

    @ApiProperty({ type: Worker })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
    public worker: Worker;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);

