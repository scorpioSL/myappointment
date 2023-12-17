import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { schemaOptions } from "../../shared/utils/mongoose.util";

export type WorkerDocument = HydratedDocument<Worker>;

@Schema(schemaOptions())
export class Worker extends Document {

    @Prop({ required: true })
    public name: string;

    @Prop()
    public description: string;

    @Prop([String])
    public qualifications: string[];
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
