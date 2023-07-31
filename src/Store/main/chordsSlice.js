import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axiosConfig from "../features/axiosConfig";
import { toastr } from "react-redux-toastr";
import axios from "axios";

export const getChords = createAsyncThunk(
  "chords/getChords",
  async () => {
    const response = await axiosConfig.get(`/api/chords`);
    // const response = await axios.get(`${proxy}/api/chords`)

    let { data } = await response.data;
    return data;
  }
);

export const addChord = createAsyncThunk(
  "chords/addChord",
  async (chord, { dispatch, getState }) => {
    try {
      console.log(chord);
      const response = await axios.post('http://localhost:8080/api/chords', chord);

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

export const updateChord = createAsyncThunk(
  "chords/updateChord",
  async (chord, { dispatch, getState }) => {
    const response = await axiosConfig.put(`/api/chords/${chord.chordId}`, chord);
    const { data } = await response.data;
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Güncellendi");
      return data;
    }
    return null;
  }
);

export const removeChord = createAsyncThunk(
  "chords/removeChord",
  async (chordId, { dispatch, getState }) => {
    let response = await axiosConfig.delete(`/api/chords/${chordId}`);
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Silindi");
      return chordId;
    }
    return chordId;
  }
);

const chordsAdapter = createEntityAdapter({
  selectId: (chord) => chord._id,
});

export const {
  selectAll: selectChords,
  selectById: selectChordById,
} = chordsAdapter.getSelectors((state) => state.chords);

const chordsSlice = createSlice({
  name: "chords",
  initialState: chordsAdapter.getInitialState({
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
    openNewChordDialog: (state, action) => {
      state.chordDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewChordDialog: (state, action) => {
      state.chordDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditChordDialog: (state, action) => {
      state.chordDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditChordDialog: (state, action) => {
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
    [updateChord.fulfilled]: chordsAdapter.upsertOne,
    [addChord.fulfilled]: chordsAdapter.addOne,
    [removeChord.fulfilled]: (state, action) =>
      chordsAdapter.removeOne(state, action.payload),
    [getChords.fulfilled]: chordsAdapter.setAll,
  },
});

export const {
  setChordSearchText,
  openNewChordDialog,
  closeNewChordDialog,
  openEditChordDialog,
  closeEditChordDialog,
  openConfirmDialog,
  closeConfirmDialog,
} = chordsSlice.actions;

export default chordsSlice.reducer;