import { join } from 'path';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Logger } from './utils';
import { connectDB } from './db';
import { errorHandler } from './middleware';

// Routers
import { snippetRouter } from './routes/snippets';
import { authRoutes } from './routes/auth';

// Env config
dotenv.config({ path: './src/config/.env' });

const app = express();
const logger = new Logger('server');
const PORT = process.env.PORT || 5000;

// CORS config - Permitir peticiones del frontend
app.use(cors({
  origin: [
    'http://localhost:3000',  // Frontend en desarrollo
    'http://frontend:3000'    // Frontend en Docker (si aplicable)
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// App config
app.use(express.json());
app.use(express.static(join(__dirname, '../public')));

// Serve client code
app.get(/^\/(?!api)/, (req: Request, res: Response) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

// Routes
app.use('/api/snippets', snippetRouter);
app.use('/api/auth', authRoutes);

// Error handler
app.use(errorHandler);

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    logger.log(
      `Server is working on port ${PORT} in ${process.env.NODE_ENV} mode`
    );
  });
})();
