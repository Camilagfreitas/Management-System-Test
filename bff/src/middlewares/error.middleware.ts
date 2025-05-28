import { ErrorRequestHandler } from 'express';
import { AppError } from '../errors/app-error';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};
