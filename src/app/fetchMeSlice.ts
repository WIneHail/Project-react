import { fetchProfile, ResFetchMe } from "../api/User"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface fetchMeSliceState {
  user: ResFetchMe | undefined,
  status: "idle" | "success" | "loading" | "failed"
}

const initialState: fetchMeSliceState = {
  user: undefined,
  status: "idle",
}

export const fetchCurrentUser = createAsyncThunk(
  'fetchMe',
  async () => {
    const data = await fetchProfile()
    return data
  },
)

export const fetchMeSlice = createSlice({
  name: "fetchMe",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = undefined;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.user = action.payload
    })
  },
})

export const { resetUser } = fetchMeSlice.actions;
export default fetchMeSlice.reducer

