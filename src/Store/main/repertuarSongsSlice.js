import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import { db } from "lib/firebase"; // Firebase Firestore yapılandırması
import { collection, updateDoc, deleteDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { uid } from 'uid';

export const getRepertuarSongs = createAsyncThunk(
  "repertuarSongs/getRepertuarSongs",
  async () => {
    const repertuarSongsCollection = collection(db, "repertuarSongs");
    const querySnapshot = await getDocs(repertuarSongsCollection);

    const repertuarSongsData = [];
    querySnapshot.forEach((doc) => {
      repertuarSongsData.push({ ...doc.data() });
    });

    return repertuarSongsData;
  }
);

export const addRepertuarSong = createAsyncThunk(
  "repertuarSongs/addRepertuarSong",
  async (repertuarSong, { dispatch, getState }) => {
    try {
      let songData = {
        ...repertuarSong,
        repertuarSongId: uid(24),
        createdDate: Date.now(),
      }
      const songDocRef = doc(db, "repertuarSongs", songData.repertuarSongId);
      await setDoc(songDocRef, songData);

      toastr.success("Başarılı", "Şarkı Eklendi");
      return { ...songData, success: true };
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
  }
);

export const updateRepertuarSong = createAsyncThunk(
  "repertuarSongs/updateRepertuarSong",
  async (song, { dispatch, getState }) => {
    try {
      const songRef = doc(db, "repertuarSongs", song.songId);
      await updateDoc(songRef, song);

      toastr.success("Başarılı", "Şarkı Güncellendi");
      return song;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeRepertuarSong = createAsyncThunk(
  "repertuarSongs/removeRepertuarSong",
  async (repertuarSongId, { dispatch, getState }) => {
    try {
      
      const songNoteRef = doc(db, "repertuarSongs", repertuarSongId);  // Doğru belge referansını oluşturun

      await deleteDoc(songNoteRef);  // Belge referansını kullanarak belgeyi silin

      toastr.success("Başarılı", "Not Silindi");
      return { repertuarSongId, success: true };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

const repertuarSongsAdapter = createEntityAdapter({
  selectId: (repertuarSong) => repertuarSong.repertuarSongId,
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