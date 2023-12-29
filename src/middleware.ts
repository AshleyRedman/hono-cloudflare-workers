import { zValidator } from '@hono/zod-validator';
import { addSeconds } from 'date-fns';
import type { Next } from 'hono';
import { setCookie } from 'hono/cookie';
import { Event } from './types';
import { ONE_HOUR_IN_SECONDS, env, host } from './utils';

export const logger = async (event: Event, next: Next) => {
    switch (env(event).STAGE) {
        case 'DEV': {
            console.log('In dev');
            break;
        }
        case 'PROD': {
            // Production logging
            break;
        }
    }

    await next();
};

export const validate = (
    target: Parameters<typeof zValidator>[0],
    schema: Parameters<typeof zValidator>[1],
    hook?: Parameters<typeof zValidator>[2]
) => {
    if (hook !== undefined) return zValidator(target, schema, hook);

    return zValidator(target, schema, (result, event) => {
        if (!result.success) {
            const errors: Record<number, string> = {};
            result.error.errors.forEach((e, i) => (errors[i] = e.message));
            return event.json({ errors });
        }
    });
};

export const setAuthCookie = async (event: Event, next: Next) => {
    setCookie(event, 'Key', 'Value', {
        httpOnly: true,
        domain: host(env(event).API_ORIGIN),
        maxAge: ONE_HOUR_IN_SECONDS,
        expires: addSeconds(new Date(), ONE_HOUR_IN_SECONDS),
        sameSite: env(event).STAGE === 'DEV' ? 'Lax' : 'Strict',
        secure: true
    });

    await next();
};
