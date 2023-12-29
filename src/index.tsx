import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { logger, validate } from './middleware';

import * as content from './content';
import { host } from './utils';

const app = new Hono().basePath('/v1');

app.use(
    '*',
    cors({
        origin: host(origin)
    })
);
app.use('*', logger);

app.post(
    '/test/:id',
    validate('json', content.bodySchema),
    validate('param', content.paramsSchema),
    validate('query', content.querySchema),
    content.handler
);

export default app;
