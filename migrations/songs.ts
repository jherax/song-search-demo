import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('song')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('artist_name', 'text', (col) => col.notNull())
    .addColumn('track_name', 'text', (col) => col.notNull())
    .addColumn('popularity', 'integer')
    .addColumn('year', 'integer')
    .addColumn('genre', 'text')
    .addColumn('danceability', 'float4')
    .addColumn('energy', 'float4')
    .addColumn('key', 'integer')
    .addColumn('loudness', 'float4')
    .addColumn('speechiness', 'float4')
    .addColumn('acousticness', 'float4')
    .addColumn('liveness', 'float4')
    .addColumn('tempo', 'float4')
    .addColumn('duration_ms', 'integer')
    .addColumn('time_signature', 'integer')
    .execute()
}
