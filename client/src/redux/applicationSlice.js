import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import applicationService from './applicationService'
import {ethers} from 'ethers'

export const getApplications = createAsyncThunk(
    'app/get-applications',
    async (_key, thunkAPI) => {
      try {
        return await applicationService.getApplications(_key)
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

export const applyApplication = createAsyncThunk(
    'app/apply-application',
    async (data, thunkAPI) => {
      try {
        return await applicationService.applyApplication(data)
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
    applications: null
}

export const applicationSlice = createSlice({
    name:"applications",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getApplications.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(getApplications.fulfilled, (state, action) => {
          state.isLoading = false,
          state.applications = action.payload,
          state.isError = false
        })
        builder.addCase(getApplications.rejected, (state, action) => {
            state.isLoading = false,
            state.applications = null,
            state.isError = true
          })
        builder.addCase(applyApplication.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(applyApplication.fulfilled, (state, action) => {
            console.log('applications',action.payload )
          state.isLoading = false,
          state.isError = false
        })
        builder.addCase(applyApplication.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true
          })
      },
})

// Action creators are generated for each case reducer function
export const { } = applicationSlice.actions

export default applicationSlice.reducer