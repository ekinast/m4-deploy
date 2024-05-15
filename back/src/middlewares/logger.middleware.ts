import { Request, Response, NextFunction } from 'express';

export function LoggerGlobal(req: Request, res: Response, next: NextFunction) {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  const formattedTime = currentDate.toLocaleTimeString();
  console.log(
    `Está ejecutando un método ${req.method} en la ruta ${req.url} ${formattedDate} ${formattedTime} `,
  );
  next();
}
