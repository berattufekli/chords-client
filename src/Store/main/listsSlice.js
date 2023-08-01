import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axiosConfig from "../features/axiosConfig";
import { toastr } from "react-redux-toastr";
import axios from "axios";

export const getLists = createAsyncThunk(
  "lists/getLists",
  async () => {
    const response = await axios.get('http://localhost:8080/api/lists');
    // const response = await axios.get(`${proxy}/api/songs`)

    let { data } = await response.data;
    return data;
  }
);

export const getListByUser = createAsyncThunk(
  "lists/getListByUser",
  async (userId) => {
    const response = await axios.get(`http://localhost:8080/api/lists/${userId}`);
    // const response = await axios.get(`${proxy}/api/songs`)

    let { data } = await response.data;
    return data;
  }
);

export const addList = createAsyncThunk(
  "lists/addList",
  async (list, { dispatch, getState }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/lists', list);

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

export const updateList = createAsyncThunk(
  "lists/updateList",
  async (list, { dispatch, getState }) => {
    const response = await axios.put(
      `http://localhost:8080/api/lists/${list._id}`,
      list);

    const { data } = await response.data;
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Güncellendi");
      return { ...data, success: true };
    }
    return { ...data, success: false };;
  }
);

export const removeList = createAsyncThunk(
  "lists/removeList",
  async (listId, { dispatch, getState }) => {
    const response = await axios.delete(`http://localhost:8080/api/lists/${listId}`);
    if (response.data.success === true) {
      toastr.success("Başarılı", "Kayıt Silindi");
      return listId;
    }
    return listId;
  }
);

const listsAdapter = createEntityAdapter({
  selectId: (list) => list._id,
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