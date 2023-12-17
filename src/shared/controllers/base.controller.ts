import { Body, Delete, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { BaseDto } from "../dto/base.dto";
import { QueryDto } from "../dto/query.dto";
import { IBaseController } from "../interfaces/base-controller.interface";
import { BaseService } from "../services/base.service";
import { Response } from 'express';
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { DeleteDto } from "../dto/delete.dto";

export abstract class BaseController<Document, Service extends BaseService<Document>> implements IBaseController<Document> {

    constructor(protected readonly service: Service) { }

    @Post('')
    public async upsert<DTO extends BaseDto>(@Body() model: DTO, @Res() res: Response): Promise<Response<Document, Record<string, any>>> {
        const validation = await this.service.doUpsertValidation(model);
        if (!validation.success) {
            return res.status(validation.status || HttpStatus.BAD_REQUEST).send(validation.message);
        }

        const document = await this.service.upsert(model);
        return res.status(HttpStatus.OK).send(document);
    }

    @Get(':id')
    public async find(@Param('id') id: string, @Res() res: Response): Promise<Response<any, Record<string, any>>> {
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
    @ApiResponse({ status: 200, description: 'OK.' })
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
