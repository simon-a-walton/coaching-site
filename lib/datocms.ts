import { executeQuery } from '@datocms/cda-client';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const performRequest = (query: string, options?: any) => {
  return executeQuery(query, {
    ...options,
    token: process.env.NEXT_DATOCMS_API_TOKEN,
    environment: process.env.NEXT_DATOCMS_ENVIRONMENT,
  });
}