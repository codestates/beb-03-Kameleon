import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false as boolean,
  account: '' as string,
  klayPrice: 0 as number,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.account = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.account = '';
    },
    getKlayPrice: (state, action) => {
      state.klayPrice = action.payload;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
