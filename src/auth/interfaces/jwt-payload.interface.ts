import { Role } from 'generated/prisma';

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}
