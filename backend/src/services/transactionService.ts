import prisma from '../config/database';

export const transactionService = {
  async create(userId: string, data: {
    amount: number;
    description?: string;
    type: string;
    categoryId: string;
    date?: Date;
  }) {
    return await prisma.transaction.create({
      data: {
        ...data,
        userId,
        date: data.date || new Date(),
      },
      include: {
        category: true,
      },
    });
  },

  async getAll(userId: string, filters?: {
    type?: string;
    categoryId?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const where: any = { userId };

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.startDate || filters?.endDate) {
      where.date = {};
      if (filters.startDate) {
        where.date.gte = filters.startDate;
      }
      if (filters.endDate) {
        where.date.lte = filters.endDate;
      }
    }

    return await prisma.transaction.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  },

  async getById(id: string, userId: string) {
    return await prisma.transaction.findFirst({
      where: { id, userId },
      include: {
        category: true,
      },
    });
  },

  async update(id: string, userId: string, data: {
    amount?: number;
    description?: string;
    type?: string;
    categoryId?: string;
    date?: Date;
  }) {
    return await prisma.transaction.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  },

  async delete(id: string, userId: string) {
    return await prisma.transaction.delete({
      where: { id },
    });
  },

  async getStats(userId: string, startDate?: Date, endDate?: Date) {
    const where: any = { userId };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    const [income, expense, transactionCount] = await Promise.all([
      prisma.transaction.aggregate({
        where: { ...where, type: 'income' },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { ...where, type: 'expense' },
        _sum: { amount: true },
      }),
      prisma.transaction.count({ where }),
    ]);

    const totalIncome = income._sum.amount || 0;
    const totalExpense = expense._sum.amount || 0;
    const balance = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      balance,
      transactionCount,
    };
  },
};