import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseDto } from "./base.dto";

export class WorkerPostDto {

    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public name: string;

    @ApiPropertyOptional({ description: 'A short description about the worker.', nullable: true })
    @IsString()
    @IsOptional()
    public description?: string;

    @ApiPropertyOptional({ description: 'Qualifications that worker has achieved.', nullable: true })
    @IsOptional()
    @IsArray()
    public qualifications?: string[];
}

export class WorkderPatchDto extends BaseDto {
    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public name: string;

    @ApiPropertyOptional({ description: 'A short description about the worker.', nullable: true })
    @IsString()
    @IsOptional()
    public description?: string;

    @ApiPropertyOptional({ description: 'Qualifications that worker has achieved.', nullable: true })
    @IsOptional()
    @IsArray()
    public qualifications?: string[];
}
