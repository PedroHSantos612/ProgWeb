import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const logDir = process.env.LOG_DIR || 'logs';
const logFormat = process.env.LOG_FORMAT || 'simple';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const logFilePath = path.join(logDir, 'access.log');
  
  let logMessage: string;

  if (logFormat === 'simple') {
    logMessage = `${timestamp}, ${req.url}, ${req.method}\n`;
  } else if (logFormat === 'complete') {
    logMessage = `${timestamp}, ${req.url}, ${req.method}, ${req.httpVersion}, ${req.get('User-Agent')}\n`;
  } else {
    logMessage = `${timestamp}, ${req.url}, ${req.method}\n`;
  }

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write log', err);
    }
  });

  next();
};

export default logger;