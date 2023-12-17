import { WorkerDto } from "../../src/shared/dto/worker.dto";


export const WorkerDtoStub = (): WorkerDto => {
    return {
        name: 'Pulasthi Bandara',
        description: 'Software Engineer',
        qualifications: [
            'Bachelor of Information Technology, University of Moratuwa',
        ],
    };
};
