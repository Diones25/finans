import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { SpentModule } from './spent/spent.module';
import { ConstructionModule } from './construction/construction.module';

@Module({
  imports: [PrismaModule, CategoryModule, SpentModule, ConstructionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
