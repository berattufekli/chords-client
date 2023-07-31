import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axiosConfig from "../features/axiosConfig";
import { toastr } from "react-redux-toastr";
import axios from "axios";

export const getSongNotes = createAsyncThunk(
  "songNotes/getSongNotes",
  async () => {
    const response = await axiosConfig.get(`/api/artists`);
    // const response = await axios.get(`${proxy}/api/artists`)
    console.log(response.data);
    let { data } = await response.data;
    return data;
  }
);

export const addSongNote = createAsyncThunk(
  "songNotes/addSongNote",
  async (songNote, { dispatch, getState }) => {
    try {

      console.log(songNote);
      const response = await axios.post('http://localhost:8080/api/song-notes', songNote);

      const { data } = await response.data;
      if (response.data.success === true) {
        toastr.success("Başarılı", "Kayıt Güncellendi");

        return { ...data, success: true };
      }
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");

      return null;
    }
  }
);

export const updateSongNote = createAsyncThunk(
  "songNotes/updateSongNote",
  async (songNote, { dispatch, getState }) => {

    const response = await axios.put(
      `http://localhost:8080/api/song-notes/${songNote._id}`,
      songNote);

    const { data } = await response.data;
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Güncellendi");

      return { ...data, success: true };
    }
    return null;
  }
);

export const removeSongNote = createAsyncThunk(
  "songNotes/removeSongNote",
  async (songNote, { dispatch, getState }) => {

    const response = await axios.delete(`http://localhost:8080/api/song-notes/${songNote._id}`);

    const { data } = response.data;
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Silindi");
      return { ...data, success: true };
    }
    return null;
  }
);

const songNotesAdapter = createEntityAdapter({
  selectId: (songNote) => songNote._id,
});

export const {
  selectAll: selectSongNotes,
  selectById: selectSongNotesById,
} = songNotesAdapter.getSelectors((state) => state.songNotes);

const artistsSlice = createSlice({
  name: "songNotes",
  initialState: songNotesAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    songNoteDialog: {
      type: "new",
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setArtistSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    openNewArtistDialog: (state, action) => {
      state.songNoteDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewArtistDialog: (state, action) => {
      state.songNoteDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditArtistDialog: (state, action) => {
      state.songNoteDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditArtistDialog: (state, action) => {
      state.songNoteDialog = {
        type: "edit",
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateSongNote.fulfilled]: songNotesAdapter.upsertOne,
    [addSongNote.fulfilled]: songNotesAdapter.addOne,
    [removeSongNote.fulfilled]: (state, action) =>
      songNotesAdapter.removeOne(state, action.payload),
    [getSongNotes.fulfilled]: songNotesAdapter.setAll,
  },
});

export const {
  setArtistSearchText,
  openNewArtistDialog,
  closeNewArtistDialog,
  openEditArtistDialog,
  closeEditArtistDialog,
} = artistsSlice.actions;

export default artistsSlice.reducer;