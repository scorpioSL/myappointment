import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "./base.dto";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserPostDto {
    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public username: string;

    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public password: string;

    @ApiProperty({ nullable: true })
    @IsString()
    @IsEmail()
    @IsOptional()
    public email?: string;
}

export class UserPatchDto extends BaseDto {
    @ApiProperty({ nullable: false })
    @IsString()
    @IsNotEmpty()
    public username: string;

    @ApiProperty({ nullable: true })
    @IsString()
    @IsOptional()
    public password: string;

    @ApiProperty({ nullable: true })
    @IsString()
    @IsEmail()
    @IsOptional()
    public email?: string;
}
