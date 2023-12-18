import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsException extends HttpException {
    constructor() {
        super('A user with same username already exitsts', HttpStatus.BAD_REQUEST);
    }
}
