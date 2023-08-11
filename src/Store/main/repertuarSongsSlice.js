import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import axios from "axios";

export const getRepertuarSongs = createAsyncThunk(
  "repertuarSongs/getRepertuarSongs",
  async () => {
    const response = await axios.get('http://localhost:8080/api/repertuar-songs');

    let { data } = await response.data;
    return data;
  }
);

export const addRepertuarSong = createAsyncThunk(
  "repertuarSongs/addRepertuarSong",
  async (repertuar, { dispatch, getState }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/repertuar-songs', repertuar);

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

export const updateRepertuarSong = createAsyncThunk(
  "repertuarSongs/updateRepertuarSong",
  async (repertuar, { dispatch, getState }) => {
    const response = await axios.put(
      `http://localhost:8080/api/lists/${repertuar._id}`,
      repertuar);

    const { data } = await response.data;
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Güncellendi");
      return { ...data, success: true };
    }
    return { ...data, success: false };;
  }
);

export const removeRepertuarSong = createAsyncThunk(
  "repertuarSongs/removeRepertuarSong",
  async (repertuarSongId, { dispatch, getState }) => {
    const response = await axios.delete(`http://localhost:8080/api/repertuar-songs/${repertuarSongId}`);
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Silindi");
      return repertuarSongId;
    }
    return repertuarSongId;
  }
);

const repertuarSongsAdapter = createEntityAdapter({
  selectId: (list) => list._id,
});

export const {
  selectAll: selectLists,
  selectById: selectListById,
} = repertuarSongsAdapter.getSelectors((state) => state.repertuarSongs);

const repertuarSongsSlice = createSlice({
  name: "repertuarSongs",
  initialState: repertuarSongsAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    repertuarSongDialog: {
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
    setSongSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    openNewRepertuarSongDialog: (state, action) => {
      state.repertuarSongDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewRepertuarSongDialog: (state, action) => {
      state.repertuarSongDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditRepertuarSongDialog: (state, action) => {
      state.repertuarSongDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditRepertuarSongDialog: (state, action) => {
      state.repertuarSongDialog = {
        type: "edit",
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateRepertuarSong.fulfilled]: repertuarSongsAdapter.upsertOne,
    [addRepertuarSong.fulfilled]: repertuarSongsAdapter.addOne,
    [removeRepertuarSong.fulfilled]: (state, action) =>
      repertuarSongsAdapter.removeOne(state, action.payload),
    [getRepertuarSongs.fulfilled]: repertuarSongsAdapter.setAll,
  },
});

export const {
  openNewRepertuarSongDialog,
  closeNewRepertuarSongDialog,
  openEditRepertuarSongDialog,
  closeEditRepertuarSongDialog,
} = repertuarSongsSlice.actions;

export default repertuarSongsSlice.reducer;