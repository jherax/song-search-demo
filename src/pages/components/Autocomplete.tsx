import React from 'react';

import debounce from '@/lib/debounce';
import msToMinutesFormat from '@/lib/msToMinutesFormat';
import { logger } from '@/lib/util';
import { Song } from '@/lib/db/types';
import getSongsByArtistMemo from '../api/getSongsByArtistMemo';
import { SongApiResponse } from '../api/song';
import SongCard from './SongCard';

/* @see https://www.w3.org/TR/uievents-key/#keys-whitespace */
const SPACE_KEYS = [" ", "Enter", "Tab"];

export default function Autocomplete(props: AutocompleteProps) {
  const [searchInput, setSearchInput] = React.useState("");
  const [results, setResults] = React.useState<SongApiResponse["items"]>([]);
  const [songDetails, setSongDetails] = React.useState<Song | null>(null);

  // used useCallback to save the state of the debounced callback (bc of render)
  const debounceHttpRequest = React.useCallback(
    // performance: delays the callback execution by X miliseconds
    debounce((query: string) => {
      logger.log('Begin debounced query:', query);
      // performance: stores HTTP responses and prevents from making the same HTTP request
      getSongsByArtistMemo(query)
        .then((data: SongApiResponse) => {
          logger.log('data:', data);
          setResults(data.items);
        });
    }, props.debounceMs),
  [props.debounceMs]);

  const handleOnchange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const query = evt.target.value;
    setSearchInput(query);
    setSongDetails(null);

    if (query.length > 1) {
      debounceHttpRequest(query);
    } else {
      setResults([]);
    }
  };

  const handleOnKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const query = (evt.target as HTMLInputElement).value;
    const key = evt.key;
    if (SPACE_KEYS.includes(key)) {
      debounceHttpRequest(query);
    }
  };

  const onSuggestionClick = (song: Song) => () => {
    setSongDetails(song);
  }

  return (
    <React.Fragment>
        <div className='input-container'>
          <input id="search" value={searchInput} onChange={handleOnchange} onKeyDown={handleOnKeyDown}></input>
        </div>
        <div className='results-container'>
          <ul className="search-results">
            {!results.length && <li className="empty-results">There are no matches</li>}
            {results.map((song)=> {
              return (
                <li key={`item-${song.id}`} onClick={onSuggestionClick(song)}>
                  <span className='artist-name'>{song.artist_name}</span><i>—</i>
                  <span className='song-name'>{song.track_name}</span><i>—</i>
                  <span className='song-duration'>({msToMinutesFormat(song.duration_ms)})</span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="song-details-container">
          <SongCard song={songDetails}></SongCard>
        </div>
    </React.Fragment>
  )
}

export type AutocompleteProps = {
  readonly debounceMs: number;
}
