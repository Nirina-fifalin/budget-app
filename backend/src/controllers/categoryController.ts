import { Response } from 'express';
import { categoryService } from '../services/categoryService';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middlewares/auth';

export const categoryController = {
  async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { name, type, icon, color } = req.body;

      if (!name || !type) {
        return sendError(res, 'Name and type are required', 400);
      }

      if (!['income', 'expense'].includes(type)) {
        return sendError(res, 'Type must be either "income" or "expense"', 400);
      }

      const category = await categoryService.create(userId, {
        name,
        type,
        icon,
        color,
      });

      return sendSuccess(res, category, 'Category created successfully', 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to create category', 400);
    }
  },

  async getAll(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { type } = req.query;

      const categories = await categoryService.getAll(userId, type as string);

      return sendSuccess(res, categories, 'Categories retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to get categories', 400);
    }
  },

  async getById(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;

      const category = await categoryService.getById(id, userId);

      if (!category) {
        return sendError(res, 'Category not found', 404);
      }

      return sendSuccess(res, category, 'Category retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to get category', 400);
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;
      const { name, icon, color } = req.body;

      const category = await categoryService.update(id, userId, {
        name,
        icon,
        color,
      });

      return sendSuccess(res, category, 'Category updated successfully');
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to update category', 400);
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const { id } = req.params;

      await categoryService.delete(id, userId);

      return sendSuccess(res, null, 'Category deleted successfully');
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to delete category', 400);
    }
  },
};