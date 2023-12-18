import { BaseDto } from "../dto/base.dto";
import { QueryDto } from "../dto/query.dto";

export interface IDeleteResult {
    acknowledged: boolean;
    deletedCount: number;
};

export interface IBaseService<Document, PostDTO, PatchDTO extends BaseDto> {

    post(model: PostDTO): Promise<Document>;

    patch(model: PatchDTO): Promise<Document | undefined>;

    find(id: string): Promise<Document>;

    query(model: QueryDto): Promise<Document[]>;

    delete(id: string): Promise<IDeleteResult>;
}
