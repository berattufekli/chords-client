import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import axios from "axios";
import setAuthToken from "Store/features/setAuthToken";

export const register = createAsyncThunk(
  "auth/register",
  async (user, { dispatch, getState }) => {
    try {

      const response = await axios.post('http://localhost:8080/api/auth/register', user);

      console.log(response);

      let data = await response.data;
      return data;
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");

      return null;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user, { dispatch, getState }) => {
    try {

      const response = await axios.post('http://localhost:8080/api/auth/login', user);

      console.log(response);

      let data = await response.data;
      if (response.data.success) {
        localStorage.setItem("token", data.access_token);
        return data;
      }
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");

      return null;
    }
  }
);

export const updateUserInformation = createAsyncThunk(
  "auth/updateUserInformation",
  async (user, { dispatch, getState }) => {
    try {

      const response = await axios.put(`http://localhost:8080/api/auth/update-user-information/${user.userId}`, user);

      console.log(response);

      let data = await response.data;
      if (response.data.success) {
        localStorage.setItem("token", data.access_token);
        return { ...data, succes: true };
      }
    } catch (error) {
      toastr.error("Hata", "Bir hata oluştu. Tekrar deneyiniz.");

      return null;
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser", async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const response = await axios.post(`http://localhost:8080/api/auth/load-user`, {
        token: localStorage.token,
      });
      const data = response.data;
      console.log("success", response.data.success);
      if (response.data.success) {
        if (data) {
          return data;
        }
      } else {
        toastr.error(
          "Üyelik Bitti",
          "Lütfen satış danışmanınızla iletişime geçiniz"
        );
      }
    } catch (error) {
      toastr.error("Oturum Sonlandı", "Tekrar giriş yapınız");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem("token");
    return {
      token: null,
      isAuthenticated: false,
      loading: false,
    };
  } catch (error) { }
});




const artistsSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    userAuth: "student",
  },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => action.payload,
    [login.fulfilled]: (state, action) => action.payload,
    [loadUser.fulfilled]: (state, action) => action.payload,
    [logout.fulfilled]: (state, action) => action.payload,
    [updateUserInformation.fulfilled]: (state, action) => action.payload,
  },
});

export default artistsSlice.reducer;