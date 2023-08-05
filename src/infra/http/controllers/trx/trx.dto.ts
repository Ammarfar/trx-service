import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddTrxDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly productId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly qty: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly totalPrice: number;
}
