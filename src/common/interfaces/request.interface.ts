import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    role: string;
    // Other properties can be added here as needed
  };
}
