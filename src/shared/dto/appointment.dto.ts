import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsArray, IsDateString, ArrayMinSize, IsNumber } from "class-validator";
import { BaseDto } from "./base.dto";
import { AppointmentStatusType } from "../../persistence/documents/appointment.document";


// For better swagger documentation
export class AppointmentWorkerDto {

    @ApiProperty({ nullable: true })
    @IsString()
    @IsNotEmpty()
    public id: string;

    @ApiPropertyOptional({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public name?: string;

    @ApiPropertyOptional({ description: 'A short description about the worker.', nullable: true })
    @IsString()
    @IsOptional()
    public description?: string;

    @ApiPropertyOptional({ description: 'Qualifications that worker has achieved.', nullable: true })
    @IsOptional()
    @IsArray()
    public qualifications?: string[];
}

export class AppointmentPostDto {
    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public name: string;

    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public contactNumber: string;

    @ApiProperty({ nullable: false })
    @IsDateString()
    @IsNotEmpty()
    public appointmentDateTime: Date;

    @ApiProperty({ nullable: false })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    public services: string[];

    @ApiPropertyOptional({ nullable: true })
    @IsString()
    @IsOptional()
    public status: AppointmentStatusType;

    @ApiProperty({ nullable: false, type: AppointmentWorkerDto })
    @IsNotEmpty()
    public worker: AppointmentWorkerDto;
}

export class AppointmentPatchDto extends BaseDto {
    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public name: string;

    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public contactNumber: string;

    @ApiProperty({ nullable: false })
    @IsDateString()
    @IsNotEmpty()
    public appointmentDateTime: Date;

    @ApiProperty({ nullable: false })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    public services: string[];

    @ApiPropertyOptional({ nullable: true })
    @IsString()
    @IsOptional()
    public status: AppointmentStatusType;

    @ApiProperty({ nullable: false, type: AppointmentWorkerDto })
    @IsNotEmpty()
    public worker: AppointmentWorkerDto;
}
