import { logger } from '@/lib/util';
import { type SongApiResponse } from './song';

// stores the query as unique values
const cache = new Map<string, Promise<SongApiResponse>>();

// imported from config file or Env variable
const baseURL = 'http://localhost:2000/api';

export default function getSongsByArtistMemo(query: string): Promise<SongApiResponse> {
  query = encodeURI(query.trim());
  if (cache.has(query)) {
    logger.info('⚡️ Cached response');
    return cache.get(query) as Promise<SongApiResponse>;
  }

  const url = `${baseURL}/song/?artist=${query}`;
  logger.info(`⚡️ Memoized HTTP request to: ${url}`)
  const result: Promise<SongApiResponse> =
    fetch(url)
    .then(res => res.json())
    .catch((error) => {
      logger.warn('Something went wrong in the HTTP request');
      logger.error(error);
    });

  cache.set(query, result);
  return result;
}
