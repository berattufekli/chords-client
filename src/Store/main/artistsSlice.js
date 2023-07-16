import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axiosConfig from "../features/axiosConfig";
import { toastr } from "react-redux-toastr";

export const getArtists = createAsyncThunk(
  "artists/getArtists",
  async () => {
    const response = await axiosConfig.get(`/api/artists`);
    // const response = await axios.get(`${proxy}/api/artists`)

    let { data } = await response.data;
    return data;
  }
);

export const addArtist = createAsyncThunk(
  "artists/addArtist",
  async (artist, { dispatch, getState }) => {
    try {
      let formData = new FormData();

      formData.append("url", artist.url);
      formData.append("artistName", artist.artistName);
      formData.append("artistDescription", artist.artistDescription);
      formData.append("type", artist.type);
      formData.append("status", artist.status);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          boundary: formData._boundaries,
        },
      };

      const response = await axiosConfig.post(
        `/api/artists`,
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

export const updateArtist = createAsyncThunk(
  "artists/updateArtist",
  async (artist, { dispatch, getState }) => {
    let formData = new FormData();

    formData.append("artistId", artist.artistId);
    formData.append("url", artist.url);
    formData.append("artistName", artist.artistName);
    formData.append("artistDescription", artist.artistDescription);
    formData.append("type", artist.type);
    formData.append("status", artist.status);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        boundary: formData._boundaries,
      },
    };

    const response = await axiosConfig.put(
      `/api/artists/${artist.artistId}`,
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

export const removeArtist = createAsyncThunk(
  "artists/removeArtist",
  async (artistId, { dispatch, getState }) => {
    let response = await axiosConfig.delete(`/api/artists/${artistId}`);
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Silindi");
      return artistId;
    }
    return artistId;
  }
);

const artistsAdapter = createEntityAdapter({
  selectId: (artist) => artist.artistId,
});

export const {
  selectAll: selectArtists,
  selectById: selectArtistById,
} = artistsAdapter.getSelectors((state) => state.artists);

const artistsSlice = createSlice({
  name: "artists",
  initialState: artistsAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    artistDialog: {
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
    setArtistSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    openNewArtistDialog: (state, action) => {
      state.artistDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewArtistDialog: (state, action) => {
      state.artistDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditArtistDialog: (state, action) => {
      state.artistDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditArtistDialog: (state, action) => {
      state.artistDialog = {
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
    [updateArtist.fulfilled]: artistsAdapter.upsertOne,
    [addArtist.fulfilled]: artistsAdapter.addOne,
    [removeArtist.fulfilled]: (state, action) =>
      artistsAdapter.removeOne(state, action.payload),
    [getArtists.fulfilled]: artistsAdapter.setAll,
  },
});

export const {
  setArtistSearchText,
  openNewArtistDialog,
  closeNewArtistDialog,
  openEditArtistDialog,
  closeEditArtistDialog,
  openConfirmDialog,
  closeConfirmDialog,
} = artistsSlice.actions;

export default artistsSlice.reducer;