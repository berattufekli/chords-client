import { combineReducers } from "@reduxjs/toolkit";
import artists from "./main/artistsSlice";
import songs from "./main/songsSlice";
import chords from "./main/chordsSlice";
import songChords from "./main/songChordsSlice";
import applicationSlice from "./main/applicationSlice";


const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    artists,
    songs,
    chords,
    songChords,
    applicationSlice,
    ...asyncReducers,
  });

  return combinedReducer(state, action);
};

export default createReducer;
