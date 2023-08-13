import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import { db } from "lib/firebase"; // Firebase Firestore yapılandırması
import { collection, updateDoc, deleteDoc, getDocs, doc, setDoc, where, getDoc, query } from "firebase/firestore";
import { uid } from 'uid';

export const getLists = createAsyncThunk(
  "lists/getLists",
  async () => {
    const listsCollection = collection(db, "lists");
    const querySnapshot = await getDocs(listsCollection);

    const listsData = [];
    querySnapshot.forEach((doc) => {
      listsData.push({ ...doc.data() });
    });

    return listsData;
  }
);

export const addList = createAsyncThunk(
  "lists/addList",
  async (list, { dispatch, getState }) => {
    try {
      let listData = {
        ...list,
        listId: uid(24),
        createdDate: Date.now(),
      };
      const listDocRef = doc(db, "lists", listData.listId);
      await setDoc(listDocRef, listData);

      toastr.success("Başarılı", "Liste Eklendi");
      return { ...listData, success: true };
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
  }
);

export const updateList = createAsyncThunk(
  "lists/updateList",
  async (list, { dispatch, getState }) => {
    try {
      const listRef = doc(db, "lists", list.listId); // Belge referansı
      await updateDoc(listRef, list);

      toastr.success("Başarılı", "Liste Güncellendi");
      return list;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeList = createAsyncThunk(
  "lists/removeList",
  async (list, { dispatch, getState }) => {
    try {
      const listsCollection = collection(db, "lists");
      await deleteDoc(listsCollection, list.listId);

      toastr.success("Başarılı", "Liste Silindi");
      return list.listId;
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");
      return null;
    }
  }
);

export const getListByUser = createAsyncThunk(
  "lists/getListByUser",
  async (userId) => {
    const listsCollection = collection(db, "lists");
    const q = query(listsCollection, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    const listsData = [];
    querySnapshot.forEach((doc) => {
      listsData.push({ ...doc.data() });
    });

    return listsData;
  }
);

export const getListById = createAsyncThunk(
  "lists/getListById",
  async (listId) => {
    const listDocRef = doc(db, "lists", listId);
    const listDocSnap = await getDoc(listDocRef);

    if (listDocSnap.exists()) {
      const listData = listDocSnap.data();
      return { ...listData };
    } else {
      return null; // Eğer belirli listId'ye sahip kayıt bulunamazsa null dönebilirsiniz.
    }
  }
);



const listsAdapter = createEntityAdapter({
  selectId: (list) => list.listId,
});

export const {
  selectAll: selectLists,
  selectById: selectListById,
} = listsAdapter.getSelectors((state) => state.lists);

const listsSlice = createSlice({
  name: "lists",
  initialState: listsAdapter.getInitialState({
    searchText: "",
    routeParams: {},
    listDialog: {
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
    openNewListDialog: (state, action) => {
      state.listDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewListDialog: (state, action) => {
      state.listDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditListDialog: (state, action) => {
      state.listDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditListDialog: (state, action) => {
      state.listDialog = {
        type: "edit",
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateList.fulfilled]: listsAdapter.upsertOne,
    [addList.fulfilled]: listsAdapter.addOne,
    [removeList.fulfilled]: (state, action) =>
      listsAdapter.removeOne(state, action.payload),
    [getLists.fulfilled]: listsAdapter.setAll,
    [getListByUser.fulfilled]: listsAdapter.setAll,
    [getListById.fulfilled]: listsAdapter.setAll,
  },
});

export const {
  setSongSearchText,
  openNewListDialog,
  closeNewListDialog,
  openEditListDialog,
  closeEditListDialog,
} = listsSlice.actions;

export default listsSlice.reducer;