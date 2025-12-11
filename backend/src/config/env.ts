import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || '2cf4a6e27599c577b4e11688227e0d29e0124cc2e1a8c9c9dc30520d1b4170cd0e7442b9fe5f4c00659668cdd445dd8c747ff0511c948700221c9061d0e6b94e',
  databaseUrl: process.env.DATABASE_URL,
};
