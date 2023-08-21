import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import { db } from "lib/firebase"; // Firebase Firestore yapılandırması
import { collection, updateDoc, deleteDoc, getDocs, doc, setDoc, getDoc } from "@firebase/firestore";
import { uid } from 'uid';

export const getArtists = createAsyncThunk(
  "artists/getArtists",
  async () => {
    const artistsCollection = collection(db, "artists");
    const querySnapshot = await getDocs(artistsCollection);

    const artistsData = [];
    querySnapshot.forEach((doc) => {
      artistsData.push({ ...doc.data() });
    });

    return artistsData;
  }
);


export const getArtist = createAsyncThunk(
  "artists/getArtist",
  async (artistId) => {
    const artistRef = doc(db, "artists", artistId);
    const artistSnapshot = await getDoc(artistRef);


    const artist = [];


    if (artistSnapshot.exists()) {
      artist.push(artistSnapshot.data())
      return artist;
    } else {
      throw new Error("Artist not found");
    }
  }
);

export const addArtist = createAsyncThunk(
  "artists/addArtist",
  async (artist, { dispatch, getState }) => {
    try {
      let artistData = {
        ...artist,
        artistId: uid(24),
        createdDate: Date.now(),
      }
      const artistDocRef = doc(db, "artists", artistData.artistId);
      await setDoc(artistDocRef, artistData);

      toastr.success("Başarılı", "Kayıt Eklendi");
      return { ...artistData, success: true };
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
  }
);

export const updateArtist = createAsyncThunk(
  "artists/updateArtist",
  async (artist, { dispatch, getState }) => {
    try {
      const artistRef = doc(db, "artists", artist.artistId); // Belge referansı
      await updateDoc(artistRef, artist);

      toastr.success("Başarılı", "Kayıt Güncellendi");
      return artist;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeArtist = createAsyncThunk(
  "artists/removeArtist",
  async (artist, { dispatch, getState }) => {
    try {
      const artistsCollection = collection(db, "artists");
      await deleteDoc(artistsCollection, artist.artistId);

      toastr.success("Başarılı", "Kayıt Silindi");
      return artist.artistId;
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
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
    [getArtist.fulfilled]: artistsAdapter.setAll,
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