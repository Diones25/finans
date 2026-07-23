import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { SpentModule } from './spent/spent.module';
import { ConstructionModule } from './construction/construction.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    CategoryModule,
    SpentModule,
    ConstructionModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
