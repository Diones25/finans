import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSpentDto } from './dto/create-spent.dto';
import { UpdateSpentDto } from './dto/update-spent.dto';

@Injectable()
export class SpentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoryService
  ) { }

  private readonly logger = new Logger(SpentService.name);
  
  async create(createSpentDto: CreateSpentDto) {

    await this.categoryService.categoryNotExistsById(createSpentDto.categoryId);

    this.logger.log('Buscando saldo da categoria');
    const categoryBalance = await this.categoryService.findBalance(createSpentDto.categoryId);

    if (Number(categoryBalance?.balance) < Number(createSpentDto.value)) {
      this.logger.error('Saldo insuficiente');
      throw new BadRequestException('Saldo insuficiente');
    }

    const newBalance = Number(categoryBalance?.balance) - Number(createSpentDto.value);
    await this.categoryService.updateCategoryBalance(createSpentDto.categoryId, newBalance);

    try {
      this.logger.log('Criando gasto');
      return this.prisma.spent.create({ data: createSpentDto });
    } catch (error) {
      this.logger.error('Erro ao criar gasto', error);
      throw new InternalServerErrorException('Erro ao criar gasto', error);
    }
  }

  async findAll(currentPage: number, itensPerPage: number) {

    try {
      let page = Number(currentPage) || 1;
      let pageSize = Number(itensPerPage) || 5;

      if (page < 0) {
        page = 1;
      }

      const skip = (page - 1) * pageSize;
      const take = pageSize;

      const spents = await this.listAllSpents(skip, take);

      const totalSpents = await this.totalSpentsCount()
      const totalPages = Math.ceil(totalSpents / pageSize);

      const data = {
        spents,
        totalSpents,
        totalPages,
        pageSize: pageSize,
        page: page
      }

      this.logger.log('Buscando todos os gastos com paginação');
      return data;
    } catch (error) {
      this.logger.error('Erro ao buscar um gasto', error);
      throw new InternalServerErrorException('Erro ao buscar um gasto');
    }
  }

  async findOne(id: string) {
    await this.spentNotFound(id);
    this.logger.log(`Buscando gasto com id ${id}`);
    return this.prisma.spent.findUnique({ where: { id } });
  }

  async update(id: string, updateSpentDto: UpdateSpentDto) {
    await this.spentNotFound(id);
    await this.categoryService.categoryNotExistsById(updateSpentDto.categoryId as string);
    try {
      this.logger.log(`Atualizando gasto com id ${id}`);
      return this.prisma.spent.update({ where: { id }, data: updateSpentDto });
    } catch (error) {
      this.logger.error(`Erro ao atualizando gasto com id ${id}`, error);
      throw new InternalServerErrorException(`Erro ao atualizando gasto com id ${id}`, error);
    }
  }

  async remove(id: string) {
    await this.spentNotFound(id);
    return this.prisma.spent.delete({ where: { id } });
  }

  async listAllSpents(skip: number, take: number) {
    const spents = await this.prisma.spent.findMany({
      orderBy: [
        {
          createdAt: 'desc'
        }
      ],
      select: {
        id: true,
        value: true,
        description: true,
        createdAt: true,
        category: {
          select: {
            name: true
          }
        }
      },
      skip: skip,
      take: take
    });

    this.logger.log('Buscando todos os gastos com paginação');
    return spents;
  }

  async totalSpentsCount() {
    return await this.prisma.spent.count();
  }

  async spentNotFound(id: string) {
    const spent = await this.prisma.spent.findUnique({ where: { id } });
    if (!spent) {
      this.logger.error(`Gasto com id ${id} não encontrado`);
      throw new NotFoundException(`Gasto com id ${id} não encontrado`);
    }
    return spent;
  }
}
