import { combineReducers } from "@reduxjs/toolkit";
import artists from "./main/artistsSlice";
import songs from "./main/songsSlice";
import chords from "./main/chordsSlice";
import songChords from "./main/songChordsSlice";
import applicationSlice from "./main/applicationSlice";
import auth from "./auth/authSlice";
import songNotes from "./main/songNotesSlice";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    artists,
    songs,
    chords,
    songChords,
    songNotes,
    applicationSlice,
    ...asyncReducers,
  });

  return combinedReducer(state, action);
};

export default createReducer;
