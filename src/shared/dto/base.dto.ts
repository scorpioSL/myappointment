import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsNotEmpty, IsUUID } from "class-validator";


export class BaseDto {
    @ApiPropertyOptional({ nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}
