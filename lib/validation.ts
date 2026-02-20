import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, "'Password' must be at least 8 characters")
  .max(128, "'Password' must contain at most 128 characters")
  .regex(/^(?=.*[a-zA-Z])(?=.*\d).*$/, "'Password' must contain at least 1 letter and 1 number");

export const registerSchema = z.object({ name: z.string(), email: z.string().email(), password: passwordSchema });
export const loginSchema = z.object({ email: z.string().email(), password: passwordSchema });
export const tokenSchema = z.object({ refreshToken: z.string() });
export const forgotPasswordSchema = z.object({ email: z.string().email() });
export const resetPasswordSchema = z.object({ password: passwordSchema });
export const userPatchSchema = z.object({ email: z.string().email().optional(), password: passwordSchema.optional(), name: z.string().optional() }).refine((v) => Object.keys(v).length > 0);
