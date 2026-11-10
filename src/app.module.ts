import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';

import { PrismaModule } from './prisma/prisma.module.js';
import { BooksModule } from './books/books.module.js';

export const { ObserveModule, ObserveInstrument } =
  createObserveModule();

@Module({
  imports: [
    ObserveModule,
    PrismaModule,
    BooksModule,
  ],
})
export class AppModule {}