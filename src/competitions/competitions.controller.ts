import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CompetitionEntity } from './entities/competition.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/common/interfaces/request.interface';

@Controller('competitions')
@ApiTags('competitions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The competition has been successfully created.',
    type: CompetitionEntity,
  })
  async create(
    @Body() createCompetitionDto: CreateCompetitionDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.id;
    const competition = await this.competitionsService.create(
      createCompetitionDto,
      userId,
    );
    return {
      data: competition,
      message: 'Competition created successfully',
    };
  }

  @Get()
  @ApiOkResponse({
    description: 'List of competitions retrieved successfully.',
    type: [CompetitionEntity],
  })
  async findAll(@Req() req: AuthenticatedRequest) {
    const competitions = await this.competitionsService.findAll(req.user.id);
    return {
      data: competitions,
      message: 'Competitions retrieved successfully',
    };
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Competition retrieved successfully.',
    type: CompetitionEntity,
  })
  findOne(@Param('id') id: string) {
    const competition = this.competitionsService.findOne(+id);
    return {
      data: competition,
      message: 'Competition retrieved successfully',
    };
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Competition updated successfully.',
    type: CompetitionEntity,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCompetitionDto: UpdateCompetitionDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const competition = await this.competitionsService.update(
      +id,
      updateCompetitionDto,
      req.user.id,
    );
    return {
      data: competition,
      message: 'Competition updated successfully',
    };
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Competition removed successfully.',
    type: CompetitionEntity,
  })
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    await this.competitionsService.remove(+id, req.user.id);
    return {
      data: null,
      message: 'Competition removed successfully',
    };
  }
}
