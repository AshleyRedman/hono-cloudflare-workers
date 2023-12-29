import { Context, Env } from 'hono';

export type EnvironmentVars = {
    STAGE: 'DEV' | 'PROD';
    API_ORIGIN: string;
};

export interface Event extends Context<Env> {}
