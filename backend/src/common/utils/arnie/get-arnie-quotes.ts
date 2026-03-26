import { httpGet } from './mock-http-interface';
export type ArnieQuoteResult = { 'Arnie Quote': string } | { FAILURE: string };

export const getArnieQuotes = async (urls: string[]) => {
  if (urls.length > 0) {
    return await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await httpGet(url);
          const { message } = JSON.parse(response.body) as { message: string };
          if (response.status === 200) {
            return { 'Arnie Quote': message };
          }
          if (response.status === 500) {
            return { FAILURE: message };
          }
          return { FAILURE: 'Quote not found' };
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : 'Unknown error';
          return { FAILURE: errorMessage };
        }
      }),
    );
  }
  return [];
};
