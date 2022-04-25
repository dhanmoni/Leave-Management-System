import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import dataService from './dataService'

export const getHostel = createAsyncThunk(
    'students/get-hostel',
    async (thunkAPI) => {
      try {
        return await dataService.getHostels()
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

export const getDepartment = createAsyncThunk(
  'students/get-dept',
  async ( thunkAPI) => {
    try {
      return await dataService.getDepts()
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
    departments: null,
    hostels: null
}

export const dataSlice = createSlice({
    name:"data",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getDepartment.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(getDepartment.fulfilled, (state, action) => {
          state.isLoading = false,
          state.departments = action.payload
        })
        builder.addCase(getDepartment.rejected, (state, action) => {
            state.isLoading = false,
            state.departments = null,
            state.isError = true
          })
        builder.addCase(getHostel.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(getHostel.fulfilled, (state, action) => {
          state.isLoading = false,
          state.hostels = action.payload
        })
        builder.addCase(getHostel.rejected, (state, action) => {
            state.isLoading = false,
            state.hostels = null,
            state.isError = true
          })
      },
})

// Action creators are generated for each case reducer function
export const { } = dataSlice.actions

export default dataSlice.reducer