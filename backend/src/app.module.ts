import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { SpentModule } from './spent/spent.module';
import { ConstructionModule } from './construction/construction.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    CategoryModule,
    SpentModule,
    ConstructionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
