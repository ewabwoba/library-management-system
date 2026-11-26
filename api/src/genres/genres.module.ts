import { Module } from '@nestjs/common';
import { GenresService } from './genres.service.js';
import { GenresController } from './genres.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [GenresController],
  providers: [GenresService],
  exports: [GenresService],
})
export class GenresModule {}
