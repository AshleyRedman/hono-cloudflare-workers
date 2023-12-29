import { env as adapter } from 'hono/adapter';
import { EnvironmentVars } from './types';

export const PRODUCTION_HOST = 'example.com';

export const DEVELOPMENT_HOST = 'http://localhost:8787';

export const ONE_HOUR_IN_SECONDS = 28800;

export const env = (c: any) => adapter<EnvironmentVars>(c);

export const host = (origin: string) =>
    origin.endsWith(PRODUCTION_HOST) ? origin : DEVELOPMENT_HOST;
