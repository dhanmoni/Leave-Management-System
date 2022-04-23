import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

export const createUserProfile = createAsyncThunk(
    'auth/create-user-profile',
    async (user, thunkAPI) => {
      try {
        return await authService.createUserProfile(user)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
const initialState = {
    isLoading: false,
    isError: false,
    isLoggedIn: false,
    user: null,
    publicKey:''
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUserPublicKey: (state, action) => {
            state.publicKey = action.payload
        },
        setUserProfile: (state, action)=> {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUserProfile.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(createUserProfile.fulfilled, (state, action) => {
          state.isLoading = false,
          state.user = action.payload
        })
        builder.addCase(createUserProfile.rejected, (state, action) => {
            state.isLoading = false,
            state.isLoggedIn = false,
            state.user = null,
            state.isError = true
          })
      },
})

// Action creators are generated for each case reducer function
export const { setUserProfile, setUserPublicKey} = authSlice.actions

export default authSlice.reducer