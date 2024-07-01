import React from 'react';

import { type SongApiResponse } from './api/song';
import getSongsByArtistMemo from './api/getSongsByArtistMemo';
import msToMinutesFormat from '@/lib/msToMinutesFormat';
import debounce from '@/lib/debounce';
import { logger } from '@/lib/util';

const DEBOUNCE_MS = 500;

export default function Home() {
  const [searchInput, setSearchInput] = React.useState("");
  const [results, setResults] = React.useState<SongApiResponse["items"]>([]);

  // performace: delays the callback execution by half second
  const debounceHttpRequest = React.useCallback(
    debounce((query: string) => {
      logger.log('Begin debounced query:', query);
      // performance: stores HTTP responses and prevents from making the same HTTP request
      getSongsByArtistMemo(query)
        .then((data: SongApiResponse) => {
          logger.log('data:', data);
          setResults(data.items);
        });
    }, DEBOUNCE_MS),
  []); // used useCallback to save the state of the debounced callback (bc of render)

  const handleOnchange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const query = evt.target.value;
    setSearchInput(query);

    if (query.length > 1) {
      debounceHttpRequest(query);
    } else {
      setResults([]);
    }
  };

  return (
    <main>
      <div className='welcome'>
        <h1> Search songs from Spotify by Artist!</h1>
        <div className='input-container'>
          <input id="search" value={searchInput} onChange={handleOnchange}></input>
        </div>
        <div className='results-container'>
          <ul className="search-results">
            {results.map((song)=> {
              return (
                <li key={`item-${song.id}`}>
                  <span className='artist-name'>{song.artist_name}</span>&nbsp;—&nbsp;
                  <span className='song-name'>{song.track_name}</span>&nbsp;—&nbsp;
                  <span className='song-duration'>({msToMinutesFormat(song.duration_ms)})</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </main>
  )
}
