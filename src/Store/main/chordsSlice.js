import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import { db } from "lib/firebase"; // Firebase Firestore yapılandırması
import { collection, updateDoc, deleteDoc, getDocs, doc, setDoc } from "@firebase/firestore";
import { uid } from 'uid';


export const getChords = createAsyncThunk(
  "chords/getChords",
  async () => {
    const chordsCollection = collection(db, "chords");
    const querySnapshot = await getDocs(chordsCollection);

    const chordsData = [];
    querySnapshot.forEach((doc) => {
      chordsData.push({ ...doc.data() });
    });

    return chordsData;
  }
);

export const addChord = createAsyncThunk(
  "chords/addChord",
  async (chord, { dispatch, getState }) => {
    try {
      let chordData = {
        ...chord,
        chordId: uid(24),
        createdDate: Date.now(),
      };
      const chordDocRef = doc(db, "chords", chordData.chordId);
      await setDoc(chordDocRef, chordData);

      return { ...chordData, success: true };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export const updateChord = createAsyncThunk(
  "chords/updateChord",
  async (chord, { dispatch, getState }) => {
    try {
      const chordRef = doc(db, "chords", chord.chordId);
      await updateDoc(chordRef, chord);

      toastr.success("Başarılı", "Akor Güncellendi");
      return chord;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeChord = createAsyncThunk(
  "chords/removeChord",
  async (chord, { dispatch, getState }) => {
    try {
      const chordsCollection = collection(db, "chords");
      await deleteDoc(chordsCollection, chord.chordId);

      toastr.success("Başarılı", "Akor Silindi");
      return chord.chordId;
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
  }
);

const chordsAdapter = createEntityAdapter({
  selectId: (chord) => chord.chordId,
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