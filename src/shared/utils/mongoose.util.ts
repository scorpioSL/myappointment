import { SchemaOptions } from "mongoose";


export function transformToJson(doc, ret) {
    delete ret._id;
}


export function schemaOptions(): SchemaOptions {
    return { toJSON: { getters: true, transform: transformToJson, versionKey: false } };
}
