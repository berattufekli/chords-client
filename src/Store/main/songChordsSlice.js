import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axiosConfig from "../features/axiosConfig";
import { toastr } from "react-redux-toastr";
import axios from "axios";

export const getSongChords = createAsyncThunk(
  "songChords/getSongChords",
  async () => {
    const response = await axios.get('http://localhost:8080/api/song-chords');
    // const response = await axios.get(`${proxy}/api/chords`)

    let { data } = await response.data;
    return data;
  }
);

export const addSongChord = createAsyncThunk(
  "songChords/addSongChord",
  async (chord, { dispatch, getState }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/song-chords', chord);

      let { data } = await response.data;
      if (response.data.success === true) {
        toastr.success("Başarılı", "Kayıt Eklendi");
        return data;
      }
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
  }
);

export const updateSongChord = createAsyncThunk(
  "songChords/updateSongChord",
  async (chord, { dispatch, getState }) => {
    const response = await axiosConfig.put(`/api/song-chords/${chord.chordId}`, chord);
    const { data } = await response.data;
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Güncellendi");
      return data;
    }
    return null;
  }
);

export const removeSongChord = createAsyncThunk(
  "songChords/removeSongChord",
  async (chordId, { dispatch, getState }) => {
    let response = await axiosConfig.delete(`/api/song-chords/${chordId}`);
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Silindi");
      return chordId;
    }
    return chordId;
  }
);

const songChordsAdapter = createEntityAdapter({
  selectId: (chord) => chord._id,
});

export const {
  selectAll: selectChords,
  selectById: selectChordById,
} = songChordsAdapter.getSelectors((state) => state.songChords);

const songChordsSlice = createSlice({
  name: "songChords",
  initialState: songChordsAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    chordDialog: {
      type: "new",
      props: {
        open: false,
      },
      data: null,
    },
    confirmDialog: {
      type: "new",
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setChordSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    openNewSongChordDialog: (state, action) => {
      state.chordDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewSongChordDialog: (state, action) => {
      state.chordDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditSongChordDialog: (state, action) => {
      state.chordDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditSongChordDialog: (state, action) => {
      state.chordDialog = {
        type: "edit",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openConfirmDialog: (state, action) => {
      state.confirmDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeConfirmDialog: (state, action) => {
      state.confirmDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: action.payload,
      };
    },
  },
  extraReducers: {
    [updateSongChord.fulfilled]: songChordsAdapter.upsertOne,
    [addSongChord.fulfilled]: songChordsAdapter.addOne,
    [removeSongChord.fulfilled]: (state, action) =>
      songChordsAdapter.removeOne(state, action.payload),
    [getSongChords.fulfilled]: songChordsAdapter.setAll,
  },
});

export const {
  setChordSearchText,
  openNewSongChordDialog,
  closeNewSongChordDialog,
  openEditSongChordDialog,
  closeEditSongChordDialog,
  openConfirmDialog,
  closeConfirmDialog,
} = songChordsSlice.actions;

export default songChordsSlice.reducer;