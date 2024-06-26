import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  last_name: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ default: '000000000000000000000000' })
  id_restaurant?: string;

  @ApiPropertyOptional({ default: [] })
  id_users?: Array<string>;
}
