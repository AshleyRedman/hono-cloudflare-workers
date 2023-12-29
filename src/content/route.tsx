import { Event } from '../types';
import { Body, PathParams, QueryParams } from './types';

export const handler = async (event: Event) => {
    const body = event.req.bodyCache.json as Body;
    const query = event.req.queries() as QueryParams;
    const params = event.req.param() as PathParams;

    console.log({ body, query, params });

    try {
        let x = await fetch(`https://catfact.ninja/fact`);

        if (x.ok) {
            x = await x.json();
        }

        return event.json({ message: x }, 200);
    } catch (e) {
        return event.json({ message: 'Unknown server error.' }, 500);
    }
};
