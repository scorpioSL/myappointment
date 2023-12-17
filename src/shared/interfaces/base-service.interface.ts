import { BaseDto } from "../dto/base.dto";
import { QueryDto } from "../dto/query.dto";

export interface IDeleteResult {
    acknowledged: boolean;
    deletedCount: number;
};

export interface IBaseService<Document> {

    upsert<DTO extends BaseDto>(model: DTO): Promise<Document>;

    find(id: string): Promise<Document>;

    query(model: QueryDto): Promise<Document[]>;

    delete(id: string): Promise<IDeleteResult>;
}
