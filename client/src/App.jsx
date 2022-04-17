import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashbaord'
import ApplyLeave from './pages/ApplyLeave'
import './App.css'
import CreateProfile from './pages/CreateProfile'
const theme = createTheme({
  
  // typography: {
  //   fontFamily: 'Quicksand',
  //   fontWeightLight: 400,
  //   fontWeightRegular: 500,
  //   fontWeightMedium: 600,
  //   fontWeightBold: 700,
  // }
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
                  <CreateProfile />
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                  <Dashboard />
              }
            />
            <Route
              exact
              path="/apply"
              element={
                  <ApplyLeave />
              }
            />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
