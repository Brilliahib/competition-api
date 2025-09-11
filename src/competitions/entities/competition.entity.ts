import { ApiProperty } from '@nestjs/swagger';

export class CompetitionEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  university: string;

  @ApiProperty({ required: false, nullable: true })
  role: string | null;

  @ApiProperty({ required: false, nullable: true })
  country: string | null;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty({ required: false, nullable: true })
  url: string | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  constructor(partial: Partial<CompetitionEntity>) {
    Object.assign(this, partial);
  }
}
