import { HttpException, HttpStatus } from "@nestjs/common";


export class WorkerAlreadyExists extends HttpException {

    constructor() {
        super('A Worker with same name alredy exits', HttpStatus.BAD_REQUEST);
    }
}
