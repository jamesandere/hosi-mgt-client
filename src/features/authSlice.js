import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url, setHeaders } from "./api";
import axios from "axios";
import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  status: null,
  loginStatus: null,
  user: {},
  loadUserStatus: null,
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/signup`, user);
      return res.data;
    } catch (error) {
      console.log(error.res.data);
      return rejectWithValue(error.res.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/signin`, user);
      return res.data;
    } catch (error) {
      console.log(error.res.data);
      return rejectWithValue(error.res.data);
    }
  }
);

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  try {
    const response = await axios.get(`${url}/users/profile`, setHeaders());
    return response?.data;
  } catch (error) {
    console.log(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        username: null,
        user: {},
        loadUserStatus: null,
        userLoaded: false,
      };
    },
    autoLogout(state, action) {
      if (state.token) {
        const token = jwtDecode(state.token);
        const date = new Date(token.exp * 1000);
        if (Date.now() >= date) {
          localStorage.removeItem("token");
          return {
            ...state,
            token: "",
            user: {},
            loadUserStatus: null,
            userLoaded: false,
          };
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload) {
          state.token = action.payload.token;
          if (action.payload) {
            const user = jwtDecode(action.payload.token);

            state.token = action.payload.token;
            state.user.username = user.username;
            localStorage.setItem("token", action.payload.token);
          }
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loginStatus = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "success";
        if (action.payload) {
          const user = jwtDecode(action.payload.token);

          state.token = action.payload.token;
          state.user.username = user.username;
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "rejected";
      })
      .addCase(loadUser.pending, (state, action) => {
        state.loadUserStatus = "pending";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        const user = action.payload;

        if (user) {
          state.loadUserStatus = "success";
          state.user = {
            ...state.user,
            id: user.id,
            username: user.username,
            email: user.email,
          };
          state.userLoaded = true;
        } else {
          return state;
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loadUserStatus = "rejected";
        state.userLoaded = false;
        state.user = {};
      });
  },
});

export const { logout, autoLogout } = authSlice.actions;
export default authSlice.reducer;
