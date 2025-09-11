import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCompetitionDto } from './create-competition.dto';

export class UpdateCompetitionDto extends PartialType(CreateCompetitionDto) {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  university?: string;

  @ApiProperty({ required: false })
  role?: string;

  @ApiProperty({ required: false })
  country?: string;

  @ApiProperty({ required: false })
  start_date?: string;

  @ApiProperty({ required: false })
  end_date?: string;
}
