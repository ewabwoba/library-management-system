import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';

import { PrismaModule } from './prisma/prisma.module.js';
import { BooksModule } from './books/books.module.js';
import { AuthModule } from './auth/auth.module.js';
import { GenresModule } from './genres/genres.module.js';
import { UsersModule } from './users/users.module.js';

export const { ObserveModule, ObserveInstrument } =
  createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY!,
      appSecret: process.env.OBSERVE_APP_SECRET!,
      serviceId: 'library-management-system',
    }),
    PrismaModule,
    BooksModule,
    AuthModule,
    GenresModule,
    UsersModule,
  ],
})
export class AppModule { }