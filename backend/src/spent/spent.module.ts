import { Module } from '@nestjs/common';
import { SpentService } from './spent.service';
import { SpentController } from './spent.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [PrismaModule, CategoryModule],
  providers: [SpentService],
  controllers: [SpentController]
})
export class SpentModule {}
