import { Response } from 'express';
import { transactionService } from '../services/transactionService';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middlewares/auth';

export const transactionController = {
  async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { amount, description, type, categoryId, date } = req.body;

      if (!amount || !type || !categoryId) {
        return sendError(res, 'Amount, type, and categoryId are required', 400);
      }

      if (!['income', 'expense'].includes(type)) {
        return sendError(res, 'Type must be either "income" or "expense"', 400);
      }

      const transaction = await transactionService.create(userId, {
        amount: parseFloat(amount),
        description,
        type,
        categoryId,
        date: date ? new Date(date) : undefined,
      });

      return sendSuccess(res, transaction, 'Transaction created successfully', 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to create transaction', 400);
    }
  },

  async getAll(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { type, categoryId, startDate, endDate } = req.query;

      const transactions = await transactionService.getAll(userId, {
        type: type as string,
        categoryId: categoryId as string,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
      });

      return sendSuccess(res, transactions, 'Transactions retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to get transactions', 400);
    }
  },

  async getById(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;

      const transaction = await transactionService.getById(id, userId);

      if (!transaction) {
        return sendError(res, 'Transaction not found', 404);
      }

      return sendSuccess(res, transaction, 'Transaction retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to get transaction', 400);
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;
      const { amount, description, type, categoryId, date } = req.body;

      const transaction = await transactionService.update(id, userId, {
        amount: amount ? parseFloat(amount) : undefined,
        description,
        type,
        categoryId,
        date: date ? new Date(date) : undefined,
      });

      return sendSuccess(res, transaction, 'Transaction updated successfully');
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to update transaction', 400);
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;

      await transactionService.delete(id, userId);

      return sendSuccess(res, null, 'Transaction deleted successfully');
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to delete transaction', 400);
    }
  },

  async getStats(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { startDate, endDate } = req.query;

      const stats = await transactionService.getStats(
        userId,
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined
      );

      return sendSuccess(res, stats, 'Stats retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to get stats', 400);
    }
  },
};