
import {
  IsBoolean,
  IsInt,
  IsISBN,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(2)
  author: string;

  @IsString()
  @IsISBN()
  isbn: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(9999)
  publishedYear?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @IsInt()
  genreId: number;
}
