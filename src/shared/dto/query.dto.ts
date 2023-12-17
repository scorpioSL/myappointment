import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryDto {
    @ApiProperty({
        description: 'limit records',
        example: 20,
        default: 20,
        nullable: true,
    })
    @IsOptional()
    @IsNumber()
    limit?: number = 20;

    @ApiProperty({
        description: 'offset',
        example: 0,
        default: 0,
        nullable: true,
    })
    @IsOptional()
    @IsNumber()
    offset?: number = 0;

    @ApiProperty({
        description: 'order results by id property',
        example: 'ASC',
        default: 'ASC',
        nullable: true,
    })
    @IsOptional()
    @IsString()
    order?: 'ASC' | 'DESC' = 'ASC';

    @ApiProperty()
    @IsOptional()
    skipLimit?: boolean;
}
