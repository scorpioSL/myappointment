import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { schemaOptions } from "../../shared/utils/mongoose.util";
import { ApiProperty } from "@nestjs/swagger";

export type WorkerDocument = HydratedDocument<Worker>;

@Schema(schemaOptions())
export class Worker extends Document {

    @ApiProperty()
    @Prop({ required: true })
    public name: string;

    @ApiProperty()
    @Prop()
    public description: string;

    @ApiProperty()
    @Prop([String])
    public qualifications: string[];
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
