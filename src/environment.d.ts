declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
      };
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: string;
    }
  }
}

export {};
