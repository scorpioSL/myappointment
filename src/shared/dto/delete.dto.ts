import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteDto { 
    @ApiProperty({ nullable: false })
    @IsString()
    public id: string;
}
