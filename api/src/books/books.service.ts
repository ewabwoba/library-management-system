
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE: Add a new book
  async create(createBookDto: CreateBookDto) {
    try {
      return await this.prisma.book.create({
        data: createBookDto,
        include: { genre: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'A book with this ISBN already exists.',
        );
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'The specified genre does not exist.',
        );
      }

      throw error;
    }
  }

  // READ: Retrieve books with optional search and genre filtering
  async findAll(search?: string, genreId?: string) {
    const where: Prisma.BookWhereInput = {};

    // Search by book title OR author
    const searchTerm = search?.trim();

    if (searchTerm) {
      where.OR = [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          author: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ];
    }

    // Filter by genre ID
    const normalizedGenreId = genreId?.trim();

    if (normalizedGenreId) {
      const parsedGenreId = Number(normalizedGenreId);

      if (
        !Number.isInteger(parsedGenreId) ||
        parsedGenreId <= 0
      ) {
        throw new BadRequestException(
          'Genre ID must be a valid positive integer.',
        );
      }

      where.genreId = parsedGenreId;
    }

    return this.prisma.book.findMany({
      where,
      include: {
        genre: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // READ: Retrieve a single book
  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });

    if (!book) {
      throw new NotFoundException(
        `Book with ID ${id} was not found.`,
      );
    }

    return book;
  }

  // UPDATE: Modify an existing book
  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id);

    try {
      return await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
        include: { genre: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'A book with this ISBN already exists.',
        );
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'The specified genre does not exist.',
        );
      }

      throw error;
    }
  }

  // DELETE: Remove a book
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
    });
  }
}
