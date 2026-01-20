import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }

  private readonly logger = new Logger(CategoryService.name);

  async create(createCategoryDto: CreateCategoryDto) {
    await this.categoryExistsByName(createCategoryDto.name);

    try {
      return this.prisma.category.create({ data: createCategoryDto });
    } catch (error) {
      this.logger.error('Erro ao criar categoria', error);
      throw new InternalServerErrorException('Erro ao criar categoria');
    }
  }

  async findAll() {
    this.logger.log("Buscando todas as categorias");
    const categories = await this.prisma.category.findMany();
    if (!categories || categories.length === 0) {
      this.logger.error('Nenhuma categoria encontrada');
      throw new NotFoundException('Nenhuma categoria encontrada');
    }

    return categories;
  }

  async findOne(id: string) {
    await this.categoryNotExistsById(id);
    this.logger.log(`Buscando categoria com id ${id}`);
    return this.prisma.category.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryNotExistsById(id);
    try {
      return this.prisma.category.update({
        where: {
          id
        },
        data: updateCategoryDto
      });
    } catch (error) {
      this.logger.error('Erro ao atualizar uma categoria', error);
      throw new InternalServerErrorException('Erro ao atualizar uma categoria');
    }
  }

  async remove(id: string) {
    await this.categoryNotExistsById(id);
    const hasSpents = await this.hasLinkedSpents(id);
    if (hasSpents) {
      throw new BadRequestException('Não é possível remover esta categoria pois existem gastos vinculados a ela');
    }
    try {

      return this.prisma.category.delete({
        where: {
          id
        }
      });
    } catch (error) {
      this.logger.error('Erro ao remover uma categoria', error);
      throw new InternalServerErrorException('Erro ao remover uma categoria');
    }
  }

  async hasLinkedSpents(categoryId: string): Promise<boolean> {
    const spents = await this.prisma.spent.findFirst({
      where: {
        categoryId: categoryId
      }
    });

    return !!spents; // Retorna true se existir algum gasto vinculado
  }

  async categoryNotExistsById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id
      }
    });
    if (!category) {
      this.logger.error(`Categoria com id ${id} não existe`);
      throw new NotFoundException(`Categoria com id ${id} não existe`);
    }
  }

  async categoryExistsByName(name: string) {
    const category = await this.prisma.category.findFirst({
      select: {
        name: true,
      },
      where: {
        name
      },
    });
    if (category) {
      this.logger.error(`Categoria com o nome ${name} já existe`);
      throw new NotFoundException(`Categoria com o nome ${name} já existe`);
    }
  }

  async findBalance(id: string) {
    await this.categoryNotExistsById(id);
    return await this.prisma.category.findUnique({
      where: {
        id
      },
      select: {
        balance: true,
      }
    });
  }

  async addBalance(id: string, balance: number) {
    try {
      const balanceBD = await this.findBalance(id);
      const newBalance = Number(balanceBD?.balance) + Number(balance);

      this.logger.log(`Adicionando ${balance} ao saldo da categoria com id ${id}`);
      return await this.prisma.category.update({
        where: {
          id
        },
        data: {
          balance: newBalance
        }
      });
    } catch (error) {
      this.logger.error('Erro ao adicionar saldo', error);
      throw new InternalServerErrorException('Erro ao adicionar saldo');
    }
  }

  async updateCategoryBalance(id: string, balance: number) {
    return await this.prisma.category.update({
      where: {
        id: id
      },
      data: {
        balance: balance
      }
    })
  }
}
