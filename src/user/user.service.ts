import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../persistence/documents/user.document';
import { BaseService, IRequestValidation } from '../shared/services/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPatchDto, UserPostDto } from '../shared/dto/user.dto';
import { UserAlreadyExistsException } from '../shared/exceptions/user-alread-exists.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService<User, UserPostDto, UserPatchDto> {
    constructor(@InjectModel(User.name) protected userModel: Model<User>) {
        super(userModel);
    }

    public async doPostValidation(dto: UserPostDto): Promise<IRequestValidation> {
        const user = await this.userModel.findOne({
            username: dto.username,
        });

        if (user !== undefined) {
            return { success: false, status: HttpStatus.BAD_REQUEST, message: new UserAlreadyExistsException() }
        }


        return { success: true };
    }

    public async post(dto: UserPostDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        const user = new this.userModel(dto);
        user.password = await bcrypt.hash(dto.password, salt);
        await user.save();
        return user;
    }

    public async patch(dto: UserPatchDto): Promise<User> {
        const user = await this.userModel.findById(dto.id);

        if (dto.email) {
            user.email = dto.email;
        }

        if (dto.password) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(dto.password, salt);
        }

        await user.save();
        return user;
    }
}
