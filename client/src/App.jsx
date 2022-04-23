import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashbaord'
import ApplyLeave from './pages/ApplyLeave'
import './App.css'
import CreateProfile from './pages/CreateProfile'
import PrivateRoute from './components/PrivateRoute'

const theme = createTheme({
  
  typography: {
    fontFamily: "Quicksand",
    h3: {
      fontFamily: "Syne"
    },
    h6: {
      fontFamily: "Syne"
    }
  }
  
})


function App() {

  return (
    <ThemeProvider theme={theme}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route
              exact
              path="/create-profile"
              element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/apply"
              element={
                <PrivateRoute>
                  <ApplyLeave />
                </PrivateRoute>
              }
            />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
