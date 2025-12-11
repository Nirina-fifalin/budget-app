import prisma from '../config/database';

export const categoryService = {
  async create(userId: string, data: {
    name: string;
    type: string;
    icon?: string;
    color?: string;
  }) {
    return await prisma.category.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  async getAll(userId: string, type?: string) {
    return await prisma.category.findMany({
      where: {
        userId,
        ...(type && { type }),
      },
      orderBy: {
        name: 'asc',
      },
    });
  },

  async getById(id: string, userId: string) {
    return await prisma.category.findFirst({
      where: { id, userId },
    });
  },

  async update(id: string, userId: string, data: {
    name?: string;
    icon?: string;
    color?: string;
  }) {
    return await prisma.category.update({
      where: { id },
      data,
    });
  },

  async delete(id: string, userId: string) {
    return await prisma.category.delete({
      where: { id },
    });
  },
};