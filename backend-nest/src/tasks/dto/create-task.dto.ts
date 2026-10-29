import { Transform } from 'class-transformer/types/decorators/transform.decorator';
import { IsNotEmpty, IsString, IsEnum, IsUUID } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    title: string;
    @IsString()
    @Transform(({ value }) => value.trim())
    description: string;
    @IsEnum(['active', 'completed'])
    status: string;
    @IsUUID()
    userId: string;

}
