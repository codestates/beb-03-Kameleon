import { createSlice } from '@reduxjs/toolkit';

const initialUserInfo = {email: '', id: '', imageUri: '', isVerified: false, role: '',  uuid: '', tokenBalance: ''};

export const userSlice = createSlice({
    name: "user",
    initialState: { accessToken: undefined, userInfo: initialUserInfo},
    reducers: {
        login: (state, action) => {
          state.accessToken = action.payload;
          //console.log('⭐️⭐️⭐️---------------- dispatch: Login');
        },
        getUserInfo: (state, action) => {
          state.userInfo = action.payload;
          //console.log('⭐️⭐️⭐️---------------- dispatch: getUserInfo');
        },
        logout: (state) => {
          state.accessToken = undefined;
          state.userInfo = initialUserInfo;
          //console.log('⭐️⭐️⭐️---------------- dispatch: Logout');
        }
    },
});

export const { login } = userSlice.actions;
export const { getUserInfo } = userSlice.actions;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
