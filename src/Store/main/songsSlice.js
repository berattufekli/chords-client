import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axiosConfig from "../features/axiosConfig";
import { toastr } from "react-redux-toastr";

export const getSongs = createAsyncThunk(
  "songs/getSongs",
  async () => {
    const response = await axiosConfig.get(`/api/songs`);
    // const response = await axios.get(`${proxy}/api/songs`)

    let { data } = await response.data;
    return data;
  }
);

export const addSong = createAsyncThunk(
  "songs/addSong",
  async (song, { dispatch, getState }) => {
    try {
      let formData = new FormData();

      formData.append("artistId", song.artistId);
      formData.append("songName", song.songName);
      formData.append("songAlbum", song.songAlbum);
      formData.append("status", song.status);
      formData.append("lyricsData", JSON.stringify(song.lyricsData));

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          boundary: formData._boundaries,
        },
      };

      const response = await axiosConfig.post(
        `/api/songs`,
        formData,
        config
      );
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

export const updateSong = createAsyncThunk(
  "songs/updateSong",
  async (song, { dispatch, getState }) => {
    let formData = new FormData();

    formData.append("artistId", song.artistId);
    formData.append("songName", song.songName);
    formData.append("songAlbum", song.songAlbum);
    formData.append("status", song.status);
    formData.append("lyricsData", JSON.stringify(song.lyricsData));
    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        boundary: formData._boundaries,
      },
    };

    const response = await axiosConfig.put(
      `/api/songs/${song.songId}`,
      formData,
      config
    );
    const { data } = await response.data;
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Güncellendi");
      return data;
    }
    return null;
  }
);

export const removeSong = createAsyncThunk(
  "songs/removeSong",
  async (songId, { dispatch, getState }) => {
    let response = await axiosConfig.delete(`/api/songs/${songId}`);
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Silindi");
      return songId;
    }
    return songId;
  }
);

const songsAdapter = createEntityAdapter({
  selectId: (song) => song.songId,
});

export const {
  selectAll: selectSongs,
  selectById: selectSongById,
} = songsAdapter.getSelectors((state) => state.songs);

const songsSlice = createSlice({
  name: "songs",
  initialState: songsAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    songDialog: {
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
    openNewSongDialog: (state, action) => {
      state.songDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewSongDialog: (state, action) => {
      state.songDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditSongDialog: (state, action) => {
      state.songDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditSongDialog: (state, action) => {
      state.songDialog = {
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
    [updateSong.fulfilled]: songsAdapter.upsertOne,
    [addSong.fulfilled]: songsAdapter.addOne,
    [removeSong.fulfilled]: (state, action) =>
      songsAdapter.removeOne(state, action.payload),
    [getSongs.fulfilled]: songsAdapter.setAll,
  },
});

export const {
  setSongSearchText,
  openNewSongDialog,
  closeNewSongDialog,
  openEditSongDialog,
  closeEditSongDialog,
  openConfirmDialog,
  closeConfirmDialog,
} = songsSlice.actions;

export default songsSlice.reducer;