import { db } from '@/lib/db/postgres';
import { Song } from '@/lib/db/types';
import { sleep } from '@/lib/util';
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * JSON response format.
  */
export type SongApiResponse = {
  items: Song[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SongApiResponse>
) {
  // URL query parameters
  const artist = req.query.artist

  // SQL query
  let select = db.selectFrom('song').limit(10)
  if (artist) {
    select = select.where('artist_name', 'ilike', `%${artist}%`)
  }

  // execute SQL query
  const items = await select.selectAll().execute()

  // random delay to simulate network latency + db query time
  await sleep(Math.random() * 3 * 1000)

  // return results
  res.status(200).json({
    items
  })
}
