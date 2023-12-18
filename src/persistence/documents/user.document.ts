import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { schemaOptions } from "../../shared/utils/mongoose.util";
import { Document, HydratedDocument } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = HydratedDocument<User>;

@Schema(schemaOptions())
export class User extends Document {

    @ApiProperty()
    @Prop({ required: true })
    public username: string;

    @Prop({ required: true })
    public password: string;

    @ApiProperty()
    @Prop()
    public email?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
