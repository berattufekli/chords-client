const { createSlice } = require("@reduxjs/toolkit");

const applicationSlice = createSlice({
  name: "applicationSlice",
  initialState: {
    settings: {
      showChords: true,
      showSpecialNote: false,
      showNewList: false,
      showRepertuarList: false,
      showRhythm: false,
    },

  },
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setDefault: (state, action) => {
      state.settings = {
        showChords: true,
        showSpecialNote: false,
      };
    },
  },
});

export const {
  setSettings,
  setDefault
} = applicationSlice.actions;

export default applicationSlice.reducer;