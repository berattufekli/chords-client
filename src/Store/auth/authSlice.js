import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { db } from "lib/firebase";
import { collection, query, where, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";
import { auth } from "lib/firebase";
import { EmailAuthProvider, createUserWithEmailAndPassword, reauthenticateWithCredential, signInWithEmailAndPassword, updateEmail, updatePassword } from "@firebase/auth";



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

      const userDataDocRef = doc(db, "userData", userData.userId);
      await setDoc(userDataDocRef, userData);

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
        isAuthenticated: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (userData) => {
    try {
      // Kullanıcının kimlik bilgilerini al
      const user = auth.currentUser;
      const credentials = EmailAuthProvider.credential(userData.email, userData.currentPassword);

      // Kullanıcının kimlik bilgilerini yeniden doğrula
      await reauthenticateWithCredential(user, credentials);

      // Şifreyi güncelle
      await updatePassword(user, userData.newPassword);

      return { success: true, message: "Şifre güncellendi." };
    } catch (error) {
      return { success: false, message: "Şifre güncelleme işlemi başarısız oldu." };
    }
  }
);

export const updateUserInformation = createAsyncThunk(
  "auth/updateUserInformation",
  async (user, { dispatch, getState }) => {
    try {

      await updateEmail(auth.currentUser, user.email);

      let userData = {
        userId: user.userId,
        name: user.name,
        surname: user.surname,
        email: user.email,
      };

      const userRef = doc(db, "userData", user.userId); // Belge referansı
      await updateDoc(userRef, userData);

      return { ...user, ...userData, success: true };
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

        let userData = {};
        querySnapshot.forEach((doc) => {
          userData = doc.data();
        });

        return ({
          ...userData,
          success: true,
          userAuth: userData.userType,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      return ({
        success: true,
        userAuth: "student",
        isAuthenticated: false,
      });
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
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