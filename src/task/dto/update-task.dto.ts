import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    isComplated:boolean;
}
