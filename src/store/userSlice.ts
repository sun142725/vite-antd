// src/store/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "@/api"; // 假设有一个 API 文件

// 异步获取用户数据
// export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
//   const data = await api.getUser();
//   return data.name;
// });

const userSlice = createSlice({
  name: "user",
  initialState: { name: "Guest" },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchUser.fulfilled, (state, action) => {
    //   state.name = action.payload;
    // });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
