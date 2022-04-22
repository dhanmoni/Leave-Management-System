import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'


export const registerStudent = createAsyncThunk(
    'auth/student-reg',
    async (publicKey, thunkAPI) => {
     try {
        const response = await authService.register(publicKey)
        return response.data
     } catch (error) {
         console.log('in slice...')
         console.log(error)
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
     }
    }
  )
export const getStudent = createAsyncThunk(
'auth/get-student',
async (publicKey, thunkAPI) => {
    try {
    const response = await authService.getStudent(publicKey)
    console.log(response.data)
    return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
}
)

const initialState = {
    isLoading: false,
    isError: false,
    isLoggedIn: false,
    user: null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registerStudent.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(registerStudent.fulfilled, (state, action) => {
          state.isLoading = false,
          state.isLoggedIn = true,
          state.user = action.payload
        })
        builder.addCase(registerStudent.rejected, (state, action) => {
            state.isLoading = false,
            state.isLoggedIn = false,
            state.user = null,
            state.isError = true
          })
        builder.addCase(getStudent.fulfilled, (state, action)=> {
            state.user = action.payload
        })
      },
})



export default authSlice.reducer