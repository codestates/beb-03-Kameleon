import { createSlice } from '@reduxjs/toolkit';

interface RootState {
  user: {
    isLogin: boolean;
    account: string;
    nav: string;
  };
}

export const selectUser = (state: RootState) => state.user;

const initialState = {
  isLogin: false as boolean,
  account: '' as string,
  nav: 'home' as string,
  klayPrice: 0 as number,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (
      state: { isLogin: boolean; account: string },
      action: { payload: string }
    ) => {
      state.isLogin = true;
      state.account = action.payload;
    },
    onSelectNav: (state: { nav: string }, action: { payload: string }) => {
      state.nav = action.payload;
    },
    logout: (state: { isLogin: boolean; account: string }) => {
      state.isLogin = false;
      state.account = '';
    },
    getKlayPrice: (
      state: { klayPrice: number },
      action: { payload: string }
    ) => {
      state.klayPrice = +action.payload;
    },
  },
});

export const { login, logout, onSelectNav } = userSlice.actions;
export default userSlice.reducer;
