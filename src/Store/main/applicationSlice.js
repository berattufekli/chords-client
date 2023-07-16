const { createSlice } = require("@reduxjs/toolkit");

const applicationSlice = createSlice({
  name: "applicationSlice",
  initialState: {
    settings: {
      showChords: true,
    },

  },
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setDefault: (state, action) => {
      state.settings = {
        showChords: true
      };
    },
  },
});

export const {
  setSettings,
  setDefault
} = applicationSlice.actions;

export default applicationSlice.reducer;