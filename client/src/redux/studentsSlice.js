import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import studentsService from './studentsService'

export const getStudentsByHostel = createAsyncThunk(
    'students/get-students-hostel',
    async (userData, thunkAPI) => {
      try {
        return await studentsService.getStudentsByHostel(userData)
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

export const getStudentsByDepartment = createAsyncThunk(
  'students/get-students-dept',
  async (userData, thunkAPI) => {
    try {
      return await studentsService.getStudentsByDept(userData)
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

export const getAllStudents = createAsyncThunk(
    'students/get-students',
    async (userData, thunkAPI) => {
      try {
        return await studentsService.getAllStudents(userData)
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

export const approveStudent = createAsyncThunk(
    'students/approve-student',
    async (userData, thunkAPI) => {
      try {
        return await studentsService.approveStudent(userData)
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

export const rejectStudent = createAsyncThunk(
    'students/reject-student',
    async (userData, thunkAPI) => {
      try {
        return await studentsService.rejectStudent(userData)
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
    students: null
}

export const studentSlice = createSlice({
    name:"students",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getAllStudents.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(getAllStudents.fulfilled, (state, action) => {
          state.isLoading = false,
          state.students = action.payload
        })
        builder.addCase(getAllStudents.rejected, (state, action) => {
            state.isLoading = false,
            state.students = null,
            state.isError = true
          })
        builder.addCase(getStudentsByHostel.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(getStudentsByHostel.fulfilled, (state, action) => {
          state.isLoading = false,
          state.students = action.payload
        })
        builder.addCase(getStudentsByHostel.rejected, (state, action) => {
            state.isLoading = false,
            state.students = null,
            state.isError = true
          })
        builder.addCase(getStudentsByDepartment.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(getStudentsByDepartment.fulfilled, (state, action) => {
          state.isLoading = false,
          state.students = action.payload
        })
        builder.addCase(getStudentsByDepartment.rejected, (state, action) => {
            state.isLoading = false,
            state.students = null,
            state.isError = true
          })
        builder.addCase(rejectStudent.pending, (state, action)=> {
            state.isLoading = true
        })
        builder.addCase(rejectStudent.fulfilled, (state, action) => {
          state.isLoading = false
        })
        builder.addCase(rejectStudent.rejected, (state, action) => {
            state.isLoading = false,
            state.isError = true
          })
      },
})

// Action creators are generated for each case reducer function
export const { } = studentSlice.actions

export default studentSlice.reducer