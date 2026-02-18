import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const createServer = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  // IMPORTANT: Do NOT use app.setGlobalPrefix('api') here
  await app.init();
  return server;
};

export default async (req: any, res: any) => {
  await createServer();
  server(req, res);
};
