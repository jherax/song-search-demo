import React from 'react';
import Autocomplete from './components/Autocomplete';

export default function Home() {
  return (
    <main>
      <div className='welcome'>
        <h1> Search songs from Spotify by Artist!</h1>
        <Autocomplete debounceMs={500}></Autocomplete>
      </div>
    </main>
  )
}
