import { Controller, Param, Patch, Post, Res, Get, Body } from '@nestjs/common';
import { User } from '../persistence/documents/user.document';
import { BaseController } from '../shared/controllers/base.controller';
import { UserService } from './user.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPatchDto, UserPostDto } from 'src/shared/dto/user.dto';
import { Response } from 'express';
import { QueryDto } from 'src/shared/dto/query.dto';

@ApiTags('User')
@Controller('user')
export class UserController extends BaseController<User, UserPostDto, UserPatchDto, UserService> {

    constructor(protected readonly userService: UserService) {
        super(userService);
    }

    // documentation purpose. In order to show the payload within the swagger
    @Post('')
    @ApiBody({ type: UserPostDto })
    @ApiResponse({ status: 200, description: 'OK.', type: User })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async post(model: UserPostDto, @Res() res: Response): Promise<Response<User, Record<string, any>>> {
        return await super.post(model, res);
    }

    // documentation purpose. In order to show the payload within the swagger
    @Patch('')
    @ApiBody({ type: UserPatchDto })
    @ApiResponse({ status: 200, description: 'OK.', type: User })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async patch(model: UserPatchDto, @Res() res: Response): Promise<Response<User, Record<string, any>>> {
        return await super.post(model, res);
    }

    // documentation purpose. In order to show the payload within the swagger
    @Get(':id')
    @ApiResponse({ status: 200, description: 'OK.', type: User })
    @ApiResponse({ status: 404, description: 'Not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async find(@Param('id') id: string, @Res() res: Response): Promise<Response<User, Record<string, any>>> {
        return await super.find(id, res);
    }

    // documentation purpose. In order to show the payload within the swagger
    @Post('query')
    @ApiBody({ type: QueryDto })
    @ApiResponse({ status: 200, description: 'OK.', type: User, isArray: true })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    public async query(@Body() model: QueryDto): Promise<User[]> {
        return await super.query(model);
    }
}
