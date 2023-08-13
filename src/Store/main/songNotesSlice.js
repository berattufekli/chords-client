import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import { db } from "lib/firebase"; // Firebase Firestore yapılandırması
import { collection, updateDoc, deleteDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { uid } from 'uid';

export const getSongNotes = createAsyncThunk(
  "songNotes/getSongNotes",
  async () => {
    const songNotesCollection = collection(db, "songNotes");
    const querySnapshot = await getDocs(songNotesCollection);

    const songNotesData = [];
    querySnapshot.forEach((doc) => {
      songNotesData.push({ ...doc.data() });
    });

    return songNotesData;
  }
);

export const getSongNoteSongAndUserId = createAsyncThunk(
  "songNotes/getSongNoteSongAndUserId",
  async ({ songId, userId }) => {
    const songNotesCollection = collection(db, "songNotes");
    const querySnapshot = await getDocs(songNotesCollection);

    const songNotesData = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.songId === songId && data.userId === userId) {
        songNotesData.push({ ...data });
      }
    });

    return songNotesData;
  }
);

export const addSongNote = createAsyncThunk(
  "songNotes/addSongNote",
  async (songNote, { dispatch, getState }) => {
    try {
      let songNoteData = {
        ...songNote,
        songNoteId: uid(24),
        createdDate: Date.now(),
      };
      const songNoteDocRef = doc(db, "songNotes", songNoteData.songNoteId);
      await setDoc(songNoteDocRef, songNoteData);

      toastr.success("Başarılı", "Not Eklendi");
      return { ...songNoteData, success: true };
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
  }
);

export const updateSongNote = createAsyncThunk(
  "songNotes/updateSongNote",
  async (songNote, { dispatch, getState }) => {
    try {
      const songNoteRef = doc(db, "songNotes", songNote.songNoteId); // Belge referansı
      await updateDoc(songNoteRef, songNote);

      toastr.success("Başarılı", "Not Güncellendi");
      return { songNote, success: true };
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeSongNote = createAsyncThunk(
  "songNotes/removeSongNote",
  async (songNoteId, { dispatch, getState }) => {
    try {
      console.log(songNoteId);
      const songNoteRef = doc(db, "songNotes", songNoteId);  // Doğru belge referansını oluşturun

      await deleteDoc(songNoteRef);  // Belge referansını kullanarak belgeyi silin

      toastr.success("Başarılı", "Not Silindi");
      return { songNoteId, success: true };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

const songNotesAdapter = createEntityAdapter({
  selectId: (songNote) => songNote.songNoteId,
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
    [getSongNoteSongAndUserId.fulfilled]: songNotesAdapter.setAll,
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