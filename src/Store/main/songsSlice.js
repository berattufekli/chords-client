import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { db } from "lib/firebase"; // Firebase Firestore yapılandırması
import { collection, updateDoc, deleteDoc, getDocs, doc, getDoc, setDoc, query, where } from "@firebase/firestore";
import { uid } from 'uid';



export const getSongs = createAsyncThunk(
  "songs/getSongs",
  async () => {
    const songsCollection = collection(db, "songs");
    const querySnapshot = await getDocs(songsCollection);

    const songsData = [];
    const promises = querySnapshot.docs.map(async (songDoc) => {
      const songData = songDoc.data();
      const songId = songData.songId;

      //artist info getirme
      const artistId = songData.artistId;
      const artistDocRef = doc(db, "artists", artistId);
      const artistDocSnap = await getDoc(artistDocRef);
      const artistData = artistDocSnap.data();


      //chords data getirme
      const chordsInfo = [];
      const chordsCollectionRef = collection(db, 'chords');
      const chordsQuery = query(chordsCollectionRef, where('songId', '==', songId));
      const chordsQuerySnapshot = await getDocs(chordsQuery);
      chordsQuerySnapshot.forEach((doc) => {
        chordsInfo.push(doc.data());
      });

      //song chords data getirme
      const chordsData = [];
      const songChordsCollectionRef = collection(db, 'songChords');
      const songChordsQuery = query(songChordsCollectionRef, where('songId', '==', songId));
      const songChordsSnapshot = await getDocs(songChordsQuery);
      songChordsSnapshot.forEach((doc) => {
        chordsData.push(doc.data());
      });

      //şarkı bilgilerini birleştir
      const songWithArtist = {
        ...songData,
        artistInfo: artistData,
        artistId: artistId,
        chordsInfo,
        chordsData,
      };
      songsData.push(songWithArtist);
    });

    await Promise.all(promises); // Tüm asenkron işlemleri bekleyin

    console.log(songsData);

    return songsData;
  }
);

export const getArtistSongs = createAsyncThunk(
  "songs/getArtistSongs",
  async (artistId) => {
    const songsCollection = collection(db, "songs");
    const querySnapshot = await getDocs(songsCollection);

    const songsData = [];
    const promises = querySnapshot.docs.map(async (songDoc) => {
      const songData = songDoc.data();
      const songId = songData.songId;

      if (songData.artistId === artistId) {
        // artist info getirme
        const artistDocRef = doc(db, "artists", artistId);
        const artistDocSnap = await getDoc(artistDocRef);
        const artistData = artistDocSnap.data();

        // chords data getirme
        const chordsInfo = [];
        const chordsCollectionRef = collection(db, 'chords');
        const chordsQuery = query(chordsCollectionRef, where('songId', '==', songId));
        const chordsQuerySnapshot = await getDocs(chordsQuery);
        chordsQuerySnapshot.forEach((doc) => {
          chordsInfo.push(doc.data());
        });

        // song chords data getirme
        const chordsData = [];
        const songChordsCollectionRef = collection(db, 'songChords');
        const songChordsQuery = query(songChordsCollectionRef, where('songId', '==', songId));
        const songChordsSnapshot = await getDocs(songChordsQuery);
        songChordsSnapshot.forEach((doc) => {
          chordsData.push(doc.data());
        });

        // şarkı bilgilerini birleştir
        const songWithArtist = {
          ...songData,
          artistInfo: artistData,
          artistId: artistId,
          chordsInfo,
          chordsData,
        };
        songsData.push(songWithArtist);
      }
    });

    await Promise.all(promises); // Tüm asenkron işlemleri bekleyin

    console.log(songsData);

    return songsData;
  }
);

export const addSong = createAsyncThunk(
  "songs/addSong",
  async (song, { dispatch, getState }) => {
    try {
      let songData = {
        ...song,
        songId: uid(24),
        createdDate: Date.now(),
      }

      const songsCollection = doc(db, "songs", songData.songId);
      await setDoc(songsCollection, songData);

      const artistDocRef = doc(db, "artists", songData.artistId);
      const artistDocSnap = await getDoc(artistDocRef);
      const artistData = artistDocSnap.data();

      return { ...songData, artistInfo: artistData, success: true };
    } catch (error) {
      return null;
    }
  }
);

export const updateSong = createAsyncThunk(
  "songs/updateSong",
  async (song, { dispatch, getState }) => {
    try {
      let songData = {
        artistId: song.artistId,
        songName: song.songName,
        songAlbum: song.songAlbum,
        originalTone: song.originalTone,
        easyTone: song.easyTone,
        status: song.status,
        createdDate: song.createdDate,
        songId: song.songId,
        lyrics: song.lyrics,
        rhythm: song.rhythm,
      };

      console.log(songData);
      const songRef = doc(db, "songs", song.songId); // Belge referansı
      await updateDoc(songRef, songData);

      const artistDocRef = doc(db, "artists", song.artistId);
      const artistDocSnap = await getDoc(artistDocRef);
      const artistData = artistDocSnap.data();

      return { ...songData, artistInfo: artistData, success: true };
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

      return song.id;
    } catch (error) {
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
    [getArtistSongs.fulfilled]: songsAdapter.setAll,
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