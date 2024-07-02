import { Song } from '@/lib/db/types'
import msToMinutesFormat from '@/lib/msToMinutesFormat';

export default function SongCard({ song }: SongCardProps) {
  if (song == null) {
    return null;
  }
  return (
    <section>
      <table id={`card-${song.id}`} className="song-card">
        <tbody>
          <tr>
            <th>Artist name:</th>
            <td>{song.artist_name}</td>
          </tr>
          <tr>
            <th>Track name:</th>
            <td>{song.track_name}</td>
          </tr>
          <tr>
            <th>Year:</th>
            <td>{song.year}</td>
          </tr>
          <tr>
            <th>Genre:</th>
            <td className="capitalize">{song.genre}</td>
          </tr>
          <tr>
            <th>Duration:</th>
            <td>{msToMinutesFormat(song.duration_ms)}</td>
          </tr>
          <tr>
            <th>Popularity:</th>
            <td>{song.popularity}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export type SongCardProps = {
  readonly song: Song | null;
}