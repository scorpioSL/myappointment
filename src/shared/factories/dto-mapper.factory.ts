import { Model } from "mongoose";
import { BaseDto } from "../dto/base.dto";
import { Worker } from "../../persistence/documents/worker.document";
import { WorkerDto } from "../dto/worker.dto";



export type DTOMapperType = (dto: BaseDto, model: Model<any>) => Model<any>;


export class DTOMapperFactory {

    public static mappers: Map<string, DTOMapperType> = new Map<string, DTOMapperType>();


    public static install(): void {
        this.mappers.set(Worker.name, (dto: WorkerDto, model: Model<Worker>) => {
            model.updateOne({}, {
                name: dto.name,
                description: dto.description,
                qualifications: dto.qualifications,
            });
            return model;
        });
    }

    public static getMapper(name: string): DTOMapperType {
        const m = this.mappers.get(name);

        if (!m) {
            throw new Error("Not found!");
        }

        return m;
    }

}
