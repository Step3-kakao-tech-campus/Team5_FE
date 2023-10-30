import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "../../apis/user";
import { getAvatarUrl } from "../../utils/firebase";

const initialState = {
  isLogged: false,
  avatar: "",
  userInfo: {},
  loading: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (thunkAPI) => {
    try {
      const response = await getUserInfo();
      return response.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchAvatar = createAsyncThunk(
  "user/fetchAvatar",
  async (userId, thunkAPI) => {
    try {
      const response = await getAvatarUrl(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLogged = true;
    },
    logOut: (state) => {
      localStorage.clear();
      state.isLogged = false;
      state.userInfo = {};
      window.location.href = "/";
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserInfo
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = { ...state.userInfo, ...action.payload };
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // fetchAvatar
      .addCase(fetchAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.avatar = action.payload;
      })
      .addCase(fetchAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { logIn, logOut, updateAvatar } = userSlice.actions;
export default userSlice.reducer;
