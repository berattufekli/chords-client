import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { db } from "lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth } from "lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";



export const register = createAsyncThunk(
  "auth/register",
  async (user, { dispatch, getState }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const firebaseUser = userCredential.user;


      const userData = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        userType: "student",
        createDate: new Date().getTime(),
        userId: firebaseUser.uid,
      };

      // "users" koleksiyonuna veri eklemek
      await addDoc(collection(db, "userData"), userData);

      return ({
        ...userData,
        success: true,
        userAuth: "student",
        isAuthenticated: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user, { dispatch, getState }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const firebaseUser = userCredential.user;

      console.log(firebaseUser);

      // Kullanıcının Firestore'dan verilerini alın
      const usersCollection = collection(db, "userData");
      const q = query(usersCollection, where("userId", "==", firebaseUser.uid));
      const querySnapshot = await getDocs(q);

      let userData = {};
      querySnapshot.forEach((doc) => {
        userData = doc.data();
      });

      const token = await firebaseUser.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("userId", firebaseUser.uid);

      return ({
        ...userData,
        success: true,
        userAuth: userData.userType,
      });
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser", async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        
        
        const usersCollection = collection(db, "userData");
        const q = query(usersCollection, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);

        let userData = {};
        querySnapshot.forEach((doc) => {
          userData = doc.data();
        });

        console.log(userData);

        return ({
          ...userData,
          success: true,
          userAuth: userData.userType,
        });
      }
    } catch (error) {
      console.log(error);
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