import { Body, Delete, Get, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { BaseDto } from "../dto/base.dto";
import { QueryDto } from "../dto/query.dto";
import { IBaseController } from "../interfaces/base-controller.interface";
import { BaseService } from "../services/base.service";
import { Response } from 'express';
import { ApiBody, ApiProperty, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { DeleteDto } from "../dto/delete.dto";
import { IDeleteResult } from '../interfaces/base-service.interface';

export class DeleteResult implements IDeleteResult {
    @ApiProperty()
    public acknowledged: boolean;
    @ApiProperty()
    public deletedCount: number;
}

export abstract class BaseController<Document, PostDto, PatchDto extends BaseDto, Service extends BaseService<Document, PostDto, PatchDto>> implements IBaseController<Document, PostDto, PatchDto> {

    constructor(protected readonly service: Service) { }

    @Post('')
    public async post(@Body() model: PostDto, @Res() res: Response): Promise<Response<Document, Record<string, any>>> {
        const validation = await this.service.doPostValidation(model);
        if (!validation.success) {
            return res.status(validation.status || HttpStatus.BAD_REQUEST).send(validation.message);
        }

        const document = await this.service.post(model);
        return res.status(HttpStatus.OK).send(document);
    }

    @Patch('')
    @ApiResponse({ status: 404, description: 'Not found' })
    public async patch(@Body() model: PatchDto, @Res() res: Response): Promise<Response<Document, Record<string, any>>> {
        const validation = await this.service.doPatchValidation(model);
        if (!validation.success) {
            return res.status(validation.status || HttpStatus.BAD_REQUEST).send(validation.message);
        }

        const document = await this.service.patch(model);
        if (!document) {
            return res.status(404).send();
        }
        return res.status(HttpStatus.OK).send(document);
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'OK.' })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async find(@Param('id') id: string, @Res() res: Response): Promise<Response<Document, Record<string, any>>> {
        const document = await this.service.find(id);
        if (!document) {
            return res.status(404).send();
        }

        return res.status(200).send(document);
    }

    @Post('query')
    @ApiBody({ type: QueryDto })
    @ApiResponse({ status: 200, description: 'OK.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async query(@Body() model: QueryDto): Promise<Document[]> {
        return await this.service.query(model);
    }

    @Delete('')
    @ApiBody({ type: DeleteDto })
    @ApiResponse({ status: 200, description: 'OK.', type: DeleteResult })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async delete(@Body() model: DeleteDto, @Res() res: Response): Promise<Response<any, Record<string, any>>> {
        const document = await this.service.delete(model.id);
        if (!document) {
            return res.status(404).send();
        }

        return res.status(200).send(document);
    }

}
