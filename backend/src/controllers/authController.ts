import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middlewares/auth';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        return sendError(res, 'Email and password are required', 400);
      }

      if (password.length < 6) {
        return sendError(res, 'Password must be at least 6 characters', 400);
      }

      const result = await authService.register(email, password, name);

      return sendSuccess(res, result, 'User registered successfully', 201);
    } catch (error: any) {
      return sendError(res, error.message || 'Registration failed', 400);
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return sendError(res, 'Email and password are required', 400);
      }

      const result = await authService.login(email, password);

      return sendSuccess(res, result, 'Login successful');
    } catch (error: any) {
      return sendError(res, error.message || 'Login failed', 401);
    }
  },

  async getProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!;
      const user = await authService.getProfile(userId);

      return sendSuccess(res, user, 'Profile retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.message || 'Failed to get profile', 400);
    }
  },
};