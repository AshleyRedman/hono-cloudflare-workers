import { z } from 'zod';

export const bodySchema = z
    .object({
        name: z.string().min(1),
        age: z.number({ coerce: true }).min(1)
    })
    .strict({ message: 'Additional properties provided' });
export const querySchema = z.object({ KEY: z.union([z.string(), z.array(z.string())]) }).strict();
export const paramsSchema = z.object({ id: z.string() }).strict();

export type Body = z.infer<typeof bodySchema>;
export type QueryParams = z.infer<typeof querySchema>;
export type PathParams = z.infer<typeof paramsSchema>;
