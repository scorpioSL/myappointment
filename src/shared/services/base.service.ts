import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IBaseService, IDeleteResult } from "../interfaces/base-service.interface";
import { QueryDto } from "../dto/query.dto";
import { Model } from "mongoose";
import { BaseDto } from "../dto/base.dto";

export interface IUpsertValidation {
    success: boolean,
    status?: HttpStatus,
    message?: HttpException;
};

@Injectable()
export abstract class BaseService<Document> implements IBaseService<Document> {

    constructor(protected model: Model<Document>) { }

    public async doUpsertValidation<DTO extends BaseDto>(dto: DTO): Promise<IUpsertValidation> {
        // override this to do custom validations
        return { success: true };
    }

    public async upsert<DTO extends BaseDto>(dto: DTO): Promise<Document> {
        if (dto.id !== undefined) {
            const document = await this.model.findOneAndUpdate({ _id: dto.id }, dto, { new: true }).exec();
            return document;
        }

        const document = new this.model(dto);
        await document.save();
        return document;
    }

    public async find(id: string): Promise<Document> {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return undefined;
        }

        return await this.model.findById(id).exec();
    }

    public async query(dto: QueryDto): Promise<Document[]> {
        return await this.model.find().sort({ _id: dto.order === 'DESC' ? -1 : 1 }).skip(!dto.skipLimit ? dto.offset : undefined).limit(dto.limit).exec();
    }
    public async delete(id: string): Promise<IDeleteResult> {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return undefined;
        }

        return await this.model.deleteOne().where('_id').equals(id).exec();
    }

}
