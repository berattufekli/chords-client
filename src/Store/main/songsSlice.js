import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import { db } from "lib/firebase"; // Firebase Firestore yapılandırması
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { uid } from 'uid';


export const getSongs = createAsyncThunk("songs/getSongs", async () => {
  const songsCollection = collection(db, "songs");
  const querySnapshot = await getDocs(songsCollection);

  const songsData = [];
  const promises = querySnapshot.docs.map(async (songDoc) => {
    const songData = songDoc.data();
    const artistId = songData.artistId;
    console.log("artisid", artistId);
    const artistDocRef = doc(db, "artists", artistId);
    const artistDocSnap = await getDoc(artistDocRef);
    const artistData = artistDocSnap.data();

    // Şarkı ve sanatçı bilgilerini birleştirin
    const songWithArtist = { ...songData, artistInfo: artistData };
    songsData.push(songWithArtist);
  });

  console.log(songsData);

  await Promise.all(promises);

  return songsData;
});

export const addSong = createAsyncThunk(
  "songs/addSong",
  async (song, { dispatch, getState }) => {
    try {
      let songData = {
        ...song,
        songId: uid(16),
        createdDate: Date.now(),
      }

      console.log(songData);
      const songsCollection = collection(db, "songs");
      const docRef = await addDoc(songsCollection, songData);

      toastr.success("Başarılı", "Şarkı Eklendi");
      return { ...songData, success: true };
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
  }
);

export const updateSong = createAsyncThunk(
  "songs/updateSong",
  async (song, { dispatch, getState }) => {
    try {
      console.log(song);
      const songRef = doc(db, "songs", song.id); // Belge referansı
      await updateDoc(songRef, song);

      toastr.success("Başarılı", "Şarkı Güncellendi");
      return song;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeSong = createAsyncThunk(
  "songs/removeSong",
  async (song, { dispatch, getState }) => {
    try {
      const songsCollection = collection(db, "songs");
      await deleteDoc(songsCollection, song.id);

      toastr.success("Başarılı", "Şarkı Silindi");
      return song.id;
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
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