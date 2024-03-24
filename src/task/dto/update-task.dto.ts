import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsBoolean()
    isComplated:boolean;
}
