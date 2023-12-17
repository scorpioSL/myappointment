import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";


export class BaseDto {
    @ApiPropertyOptional({ nullable: true })
    @IsString()
    @IsOptional()
    public id?: string;
}
