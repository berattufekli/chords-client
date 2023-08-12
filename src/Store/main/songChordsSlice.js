import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import { db } from "lib/firebase"; // Firebase Firestore yapılandırması
import { collection, updateDoc, deleteDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { uid } from 'uid';

export const getSongChords = createAsyncThunk(
  "songChords/getSongChords",
  async () => {
    const songChordsCollection = collection(db, "songChords");
    const querySnapshot = await getDocs(songChordsCollection);

    const songChordsData = [];
    querySnapshot.forEach((doc) => {
      songChordsData.push({ ...doc.data() });
    });

    return songChordsData;
  }
);

export const addSongChord = createAsyncThunk(
  "songChords/addSongChord",
  async (songChord, { dispatch, getState }) => {
    try {
      let songChordData = {
        ...songChord,
        songChordId: uid(24),
        createdDate: Date.now(),
      }
      const songChordDocRef = doc(db, "songChords", songChordData.songChordId);
      await setDoc(songChordDocRef, songChordData);

      toastr.success("Başarılı", "Akor Kaydı Eklendi");
      return { ...songChordData, success: true };
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
  }
);

export const updateSongChord = createAsyncThunk(
  "songChords/updateSongChord",
  async (songChord, { dispatch, getState }) => {
    try {
      const songChordRef = doc(db, "songChords", songChord.songChordId);
      await updateDoc(songChordRef, songChord);

      toastr.success("Başarılı", "Akor Kaydı Güncellendi");
      return songChord;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeSongChord = createAsyncThunk(
  "songChords/removeSongChord",
  async (songChord, { dispatch, getState }) => {
    try {
      const songChordsCollection = collection(db, "songChords");
      await deleteDoc(songChordsCollection, songChord.songChordId);

      toastr.success("Başarılı", "Akor Kaydı Silindi");
      return songChord.songChordId;
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
  }
);

const songChordsAdapter = createEntityAdapter({
  selectId: (chord) => chord.songChordId,
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