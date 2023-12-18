import { SchemaOptions } from "mongoose";


export function transformToJson(doc, ret) {
    delete ret._id;
    delete ret.password;
}


export function schemaOptions(): SchemaOptions {
    return { toJSON: { getters: true, transform: transformToJson, versionKey: false } };
}
