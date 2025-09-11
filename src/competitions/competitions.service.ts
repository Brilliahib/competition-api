import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompetitionEntity } from './entities/competition.entity';

@Injectable()
export class CompetitionsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCompetitionDto: CreateCompetitionDto,
    userId: number,
  ): Promise<CompetitionEntity> {
    const competition = await this.prisma.competition.create({
      data: { ...createCompetitionDto, user_id: userId },
    });
    return new CompetitionEntity(competition);
  }

  async findAll(userId: number): Promise<CompetitionEntity[]> {
    const competitions = await this.prisma.competition.findMany({
      where: { user_id: userId },
    });
    return competitions.map(
      (competition) => new CompetitionEntity(competition),
    );
  }

  async findOne(id: number): Promise<CompetitionEntity> {
    const competition = await this.prisma.competition.findUnique({
      where: { id },
    });
    if (!competition) {
      throw new NotFoundException('Competition not found');
    }
    return new CompetitionEntity(competition);
  }

  async update(
    id: number,
    updateCompetitionDto: UpdateCompetitionDto,
    userId: number,
  ): Promise<CompetitionEntity> {
    const competition = await this.prisma.competition.findUnique({
      where: { id },
    });

    if (!competition) {
      throw new NotFoundException('Competition not found');
    }

    if (competition.user_id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this competition',
      );
    }

    const updatedCompetition = await this.prisma.competition.update({
      where: { id },
      data: { ...updateCompetitionDto },
    });
    return new CompetitionEntity(updatedCompetition);
  }

  async remove(id: number, userId: number): Promise<void> {
    const competition = await this.prisma.competition.findUnique({
      where: { id },
    });

    if (!competition) {
      throw new NotFoundException('Competition not found');
    }

    if (competition.user_id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this competition',
      );
    }
    await this.prisma.competition.delete({ where: { id } });
  }
}
