import { z } from 'zod';
import dotenv from 'dotenv';
import { logger } from '../loaders/pino.js';
import { validStringSchema } from './validation.js';

// Load environment variables dari .env
dotenv.config();
logger.info('✅ Environment variables loaded from .env');

// Schema validasi environment variables
const envSchema = z.object({
  PORT: validStringSchema
});

/** @typedef {z.infer<typeof envSchema>} EnvSchema */

/**
 * Memvalidasi environment variables sesuai dengan `envSchema`
 * @returns {EnvSchema}
 */
function validateEnv() {
  const PORT = process.env.PORT ?? process.env.HOST_PORT;

  const mergedEnv = { ...process.env, PORT };

  const { data, error } = envSchema.safeParse(mergedEnv);
  if (error) {
    throw new Error(`❌ Environment validation error: ${error.message}`);
  }

  return /** @type {EnvSchema} */ (data);
}

// Eksekusi validasi environment variables
export const appEnv = validateEnv();